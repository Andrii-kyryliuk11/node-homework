const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = await schema.validate(req.body);
    if (error) {
      console.log(error);
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = {
  validateBody,
};
