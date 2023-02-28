const Joi = require("joi");

const addMovieSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "you should provide name!!",
  }),
    email: Joi.string().email({ tlds: { allow: false } }),

    phone: 
    // Joi.string().phoneNumber().validate('+32494567324'),
    // phoneNumber({ defaultCountry: 'BE', format: 'e164' }).validate('494322456'),
    Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
});

module.exports = {
  addMovieSchema,
};