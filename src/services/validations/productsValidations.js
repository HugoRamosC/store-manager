const { idSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_ID', message: 'Invalid ID' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
};