const salesService = require('../services/salesService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_DELETED_STATUS = 204;

const newSale = async (req, res, next) => {
  try {
    const saleList = req.body;
    const saleRegister = await salesService.newSale(saleList);
    return res.status(HTTP_CREATED_STATUS).json(saleRegister);
  } catch (error) {
    next(error);
  }
};

const getSales = async (_req, res, _next) => {
  const sales = await salesService.getSales();
  return res.status(HTTP_OK_STATUS).json(sales);
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);
    return res.status(HTTP_OK_STATUS).json(sale);
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.deleteSale(id);
    return res.status(HTTP_DELETED_STATUS).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newSale,
  getSales,
  getSaleById,
  deleteSale,
};