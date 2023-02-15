const productsModel = require('../models/productsModel');
const { validateId, validateName } = require('./validations/validations');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (productId) => {
  const error = validateId(productId);
  if (error.status) throw error;
  const product = await productsModel.getById(productId);
  if (!product) {
    const notFoundError = {
      status: 'PRODUCT_NOT_FOUND', message: 'Product not found',
    };
    throw notFoundError;
  }
  return product;
};

const createProduct = async ({ name }) => {
  const error = validateName(name);
  if (error.status) throw error;
  const id = await productsModel.createProduct({ name });
  return { id, name };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};