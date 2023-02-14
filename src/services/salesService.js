const salesModel = require('../models/salesModel');
const { validateSale } = require('./validations/productsValidations');

const newSale = async (saleList) => {
  const error = saleList.map((item) => {
    const errorValidation = validateSale(item);
    if (errorValidation.status) return errorValidation;
    return false;
  });
  if (error.some((e) => !e)) throw error;

  const { id, itemsSold } = await salesModel.newSale(saleList);

  return { id, itemsSold };
};

module.exports = {
  newSale,
};