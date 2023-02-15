const { idSchema, nameSchema, saleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { status: 'BAD_REQUEST_STATUS', message: error.message };

  return { status: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
    switch (error.details[0].type) {
      case 'any.required':
        return { status: 'BAD_REQUEST_STATUS', message: error.message };
      case 'string.min':
        return { status: 'INVALID_VALUE', message: error.message };
      default:
    }
  }
  return { status: null, message: '' };
};

const validateSale = (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) {
    if (error.details[0].type === 'any.required') {
      return { status: 'BAD_REQUEST_STATUS', message: error.message };
    }
    if (error.details[0].type === 'number.min') {
      return { status: 'INVALID_VALUE', message: error.message };
    }
  }
  return { status: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
  validateSale,
};