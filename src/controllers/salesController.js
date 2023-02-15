const salesService = require('../services/salesService');

// const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const newSale = async (req, res, next) => {
  try {
    const saleList = req.body;
    const saleRegister = await salesService.newSale(saleList);
    console.log('controllerrrrr', saleRegister);
    return res.status(HTTP_CREATED_STATUS).json(saleRegister);
  } catch (error) {
    // console.log('controllerrrrr', error);
    next(error);
  }
};

module.exports = {
  newSale,
};