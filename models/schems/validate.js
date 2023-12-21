const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .min(6)
    .messages({ "any.required": "missing required phone field" }),
});

const updateContactAddSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .messages({ "any.required": "write corect name field" }),
  email: Joi.string()
    .min(6)
    .messages({ "any.required": "write corect email field" }),
  phone: Joi.string()
    .min(6)
    .messages({ "any.required": "write corect phone field" }),
});

module.exports = { contactAddSchema, updateContactAddSchema };
