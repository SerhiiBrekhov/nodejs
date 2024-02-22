const Joi = require("joi");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionsList = ["starter", "pro", "business"];

const addMovieSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" must be exist`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exist`,
  }),
  favorite: Joi.boolean().messages({
    "not.required": `"favorite" may be exist`,
  }), // name: Joi.string().min(3).required().messages({
  //   "any.required": "you should provide name!!",
  // }),
  // email: Joi.string().email({ tlds: { allow: false } }),
  // phone:
  //   // Joi.string().phoneNumber().validate('+32494567324'),
  //   // phoneNumber({ defaultCountry: 'BE', format: 'e164' }).validate('494322456'),
  //   Joi.string()
  //     .regex(/^[0-9]{10}$/)
  //     .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
  //     .required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `"email" must be exist`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `"password" must be exist`,
  }),
  subscription: Joi.string()
    .valid(...subscriptionsList)
    .required()
    .messages({
      "any.required": `"subscription" must be exist`,
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `"email" must be exist`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `"password" must be exist`,
  }),
});

module.exports = {
  addMovieSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
};
