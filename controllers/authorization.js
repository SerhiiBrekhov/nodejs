const User = require("../models/user.js");
const bcryptjs = require("bcryptjs");
const path = require("path");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const { ctrlWrapper, HttpError } = require("../helpers/index.js");
dotenv.config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  // 1.отримуємо і валідуємо дані від користувача

  const { email, password } = req.body;
  //2.шукаємо користувача в базі
  const userFinded = await User.findOne({ email });
  //3.якщо знайшли- редірект або помилка
  if (userFinded) {
    throw HttpError(409, `Email ${email} already in use`);
  }
  //4.не знайшли- хешируєм пароль і видаєм роль
  const hashPassword = await bcryptjs.hash(password, 10);

  const avatarURL = gravatar.url(email);
  //5.зберігаємо в базу з захешированим паролем
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    avatarURL,
  });
};

// аунтефікація - перевірка данних які надав користувач при регістрації з тими даними, що наявні в базі.
const login = async (req, res) => {
  // 1.отримуємо і валідуємо дані від користувача

  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(401, "Email/login or password is missed");
  }
  // 2.шукаємо користувача в базі

  const user = await User.findOne({ email });
  // 3. якщо не знайшли користувача або не розшифрували пароль- "Invalid login or password"

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);

  // console.log(passwordCompare);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  // 4. якщо знайшли і розшифрували пароль- видаєм токен
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

// авторизація - перевірка прав на доступ
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  // console.log({ email, subscription });

  res.json(200, {
    email,
    subscription,
  });
};

// розлогінення - вихід з системи
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log(req.user);
  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw httpError(
      400,
      "Invalid subscription, must be either starter, pro or business"
    );
  }

  const updatedUser = await User.findByIdAndUpdate(_id, { subscription });
  if (!updatedUser) {
    throw httpError(404, "Not found");
  }
  res.status(201).json(updatedUser);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    res.status(400).json("File upload error");
  }
  const { path: tempUpload, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;
  const resultDir = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultDir);

  const image = await Jimp.read(resultDir);
  image.resize(250, 250).write(resultDir);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: getCurrent,
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
