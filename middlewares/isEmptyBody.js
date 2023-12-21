const { httpError } = require("../helpers/httpError");

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(httpError(400, "Body must have fields"));
  }
  next();
};

module.export = { isEmptyBody };
