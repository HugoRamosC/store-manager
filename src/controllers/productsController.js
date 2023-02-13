const productsService = require('../services/productsService');

const HTTP_OK_STATUS = 200;

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(HTTP_OK_STATUS).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const error = await productsService.getById(id);

  if (error.type) return next(error);
  
  return res.status(HTTP_OK_STATUS).json(error.message);
};

module.exports = {
  getAll,
  getById,
};