const productsService = require('../services/productsService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(HTTP_OK_STATUS).json(products);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    
    if (product.status) return next(product);
    
    return res.status(HTTP_OK_STATUS).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newProduct = await productsService.createProduct({ name });
  
    return res.status(HTTP_CREATED_STATUS).json(newProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
};