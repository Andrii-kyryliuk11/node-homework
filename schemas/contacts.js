const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
    "string.base": "name must be a string",
  }),
  email: Joi.string().required().email().messages({
    "any.required": "missing required email field",
    "string.email": "enter a valid email",
  }),
  phone: Joi.number().required().messages({
    "any.required": "missing required phone field",
    "number.base": "phone must be a number",
  }),
  favorite: Joi.boolean(),
});

const putSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
    "string.base": "name must be a string",
  }),
  email: Joi.string().required().email().messages({
    "any.required": "missing required email field",
    "string.email": "enter a valid email",
  }),

  phone: Joi.number().required().messages({
    "any.required": "missing required phone field",
    "number.base": "phone must be a number",
  }),
  favorite: Joi.boolean(),
});

const patchSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
    "boolean.base": "please,enter boolean",
  }),
});

const validateEmptyBodySchema = Joi.object()
  .min(1)
  .messages({ "object.min": "missing fields" });

module.exports = { addSchema, putSchema, patchSchema, validateEmptyBodySchema };
