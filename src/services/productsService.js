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

const updateProduct = async (id, newName) => {
  const errorName = validateName(newName);
  if (errorName.status) throw errorName;
  const errorId = await getById(id);
  if (errorId.status) return errorId;
  await productsModel.updateProduct(id, newName);
  const updatedProduct = await productsModel.getById(id);
  return updatedProduct;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};