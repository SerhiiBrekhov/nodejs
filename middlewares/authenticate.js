const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers/index.js");
const User = require("../models/user.js");

dotenv.config();

const { SECRET_KEY } = process.env;

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization || "";

//   const [type, token] = authHeader.split(" ");
//   // console.log(type);

//   // console.log(token);

//   if (type !== "Bearer" || !token) {
//     next(HttpError(401.1));
//   }
//   if (type !== "Bearer" || !token) {
//     next(HttpError(401.2));
//   }
//   try {
//     const { id } = jwt.verify(token, SECRET_KEY);

//     const user = User.findById({ _id: id });

//     req.user = user;
//     req.user.id = id;
//     // console.log(req.user);
//     next();
//   } catch (error) {
//     if (
//       error.name === "JsonWebTokenError" ||
//       error.name === "TokenExpiredError"
//     )
//       next(HttpError(401.2));
//   }
// };

// module.exports = { authenticate };

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: id });
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};
module.exports = authenticate;
