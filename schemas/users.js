const Joi = require("joi");
const { emailRegexp } = require("../constants/users");

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.base": "name must be a string",
    "string.pattern.base": "write correct email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "password is too short",
  }),
});

module.exports = {
  userRegisterSchema,
};
