// const { HttpError } = require("../models/helpers/index");

// function validateBody(schema) {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       return next(HttpError(400, error.message));
//     }

//     return next();
//   };
// }

// module.exports = {
//   validateBody,
// };

const { HttpError } = require("../models/helpers/index");
const jwt = require("jsonwebtoken");
const { User } = require("../schemas/user");

const { JWT_SECRET } = process.env;

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }

    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw HttpError(401, "token type is not valid");
  }

  if (!token) {
    throw HttpError(401, "no token provided");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      throw HttpError(401, "jwt token is not valid");
    }
    throw error;
  }

  next();
}

module.exports = {
  validateBody,
  auth,
};