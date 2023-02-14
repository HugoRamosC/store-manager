const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required()
  .label('ID');

const nameSchema = Joi.string().min(5).max(30).required()
  .label('name')
  .messages({
    'string.min': '{#label} length must be at least {#limit} characters long',
    'string.base': '{#label} is required',
  });

module.exports = {
  idSchema,
  nameSchema,
};