const salesModel = require('../models/salesModel');
const productsService = require('./productsService');
const { validateSale } = require('./validations/productsValidations');

const newSale = async (saleList) => {
  const validationPromises = saleList.map(async (item) => {
    const errorValidation = validateSale(item);
    if (errorValidation.status) return errorValidation;
    const notFoundProduct = await productsService.getById(item.productId);
    if (notFoundProduct.status) return notFoundProduct;
    return item;
  });
  const validationArr = await Promise.all(validationPromises);
  if (validationArr.some((valid) => valid.status)) {
    const error = validationArr.find((err) => err.status);
    throw error;
  }
  const id = await salesModel.saleRegister();
  const itemsSold = validationArr.filter((valid) => valid.productId);
  await salesModel.newSale(id, itemsSold);
  return { id, itemsSold };
};

module.exports = {
  newSale,
};