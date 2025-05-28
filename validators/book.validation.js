const Joi = require('joi');

exports.bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});
