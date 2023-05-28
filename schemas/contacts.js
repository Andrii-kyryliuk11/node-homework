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
});

const putSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.base": "name must be a string",
  }),
  email: Joi.string().optional().email().messages({
    "string.email": "enter a valid email",
  }),
  phone: Joi.number().optional().messages({
    "number.base": "phone must be a number",
  }),
})
  .required()
  .min(1)
  .messages({ "object.min": "missing fields" });

module.exports = { addSchema, putSchema };
