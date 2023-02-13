const productsModel = require('../models/productsModel');
const { validateId } = require('./validations/productsValidations');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (productId) => {
  const { error } = validateId(productId);
  if (error.type) return error;

  const product = productsModel.getById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: '', message: product };
};

module.exports = {
  getAll,
  getById,
};