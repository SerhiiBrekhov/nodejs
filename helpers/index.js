function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

const messageList = {
  400: "Bad Request",
  401: "Unauthorized(type token is not valid or no token provide)",
  401.1: "Unauthorized(type token is not valid)",
  401.2: "Unauthorized(no token provide)",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

function HttpError(status, message = messageList[status]) {
  const err = new Error(message);
  err.status = status;
  return err;
}

const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = {
  tryCatchWrapper,
  HttpError,
  ctrlWrapper,
};
