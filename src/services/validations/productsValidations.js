const { idSchema, nameSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { status: 'BAD_REQUEST_STATUS', message: error.message };

  return { status: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { status: 'BAD_REQUEST_STATUS', message: error.message };

  return { status: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
};