const productsModel = require('../models/productsModel');
const { validateId } = require('./validations/productsValidations');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (productId) => {
  const { type, message } = validateId(productId);
  if (type) return message;

  const product = await productsModel.getById(productId);
  if (!product) {
    return {
      error: {
        status: 'PRODUCT_NOT_FOUND', message: 'Product not found',
      },
    };
  }

  return product;
};

module.exports = {
  getAll,
  getById,
};