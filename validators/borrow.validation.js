const Joi = require('joi');

exports.borrowSchema = Joi.object({
  bookId: Joi.number().required()
});

exports.returnSchema = Joi.object({
  bookId: Joi.number().required()
});
