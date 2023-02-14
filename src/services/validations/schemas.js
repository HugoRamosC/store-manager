const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required()
  .label('ID');

const nameSchema = Joi.string().min(3).max(30).required()
  .label('NAME');

module.exports = {
  idSchema,
  nameSchema,
};