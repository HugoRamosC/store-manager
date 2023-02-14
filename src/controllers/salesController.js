const salesService = require('../services/salesService');

// const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const newSale = async (req, res, next) => {
  try {
    const saleList = req.body;
    const { id, itemsSold } = await salesService.newSale(saleList);
    return res.status(HTTP_CREATED_STATUS).json({ id, itemsSold });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newSale,
};