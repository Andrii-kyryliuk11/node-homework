const Joi = require("joi");
const { emailRegexp, subscriptionTypes } = require("../constants/users");

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.base": "email must be a string",
    "string.pattern.base": "write correct email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "password is too short",
  }),
});

const userUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required()
    .messages({
      "any.required": "missing required subscription field",
      "any.only": "wrong subscription type",
    }),
});
const userVerifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required field email",
  }),
});
module.exports = {
  userRegisterSchema,
  userUpdateSchema,
  userVerifySchema,
};
