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
  if (errorId.status) throw errorId;
  await productsModel.updateProduct(id, newName);
  const updated = await productsModel.getById(id);
  return updated;
};

const deleteProduct = async (id) => {
  const error = await getById(id);
  if (error.status) throw error;
  await productsModel.deleteProduct(id);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};