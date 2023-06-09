const productsService = require('../services/productsService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_DELETED_STATUS = 204;

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(HTTP_OK_STATUS).json(products);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id); 
    return res.status(HTTP_OK_STATUS).json(product);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newProduct = await productsService.createProduct(name);
    return res.status(HTTP_CREATED_STATUS).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await productsService.updateProduct(id, name);
    return res.status(HTTP_OK_STATUS).json(updated);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    return res.status(HTTP_DELETED_STATUS).end();
  } catch (error) {
    return next(error);
  }
};

const searchProduct = async (req, res, next) => {
  try {
    const { q } = req.query;
    const productsFound = await productsService.searchProduct(q);
    return res.status(HTTP_OK_STATUS).json(productsFound);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};