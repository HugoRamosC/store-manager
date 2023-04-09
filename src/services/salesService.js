const salesModel = require('../models/salesModel');
const productsService = require('./productsService');
const { validateSale, validateId } = require('./validations/validations');

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

const getSales = async () => {
  const sales = await salesModel.getSales();
  return sales;
};

const getSaleById = async (id) => {
  const error = validateId(id);
  if (error.status) throw error;
  const allSales = await salesModel.getSales();
  const arrSalesId = allSales.map((sale) => +sale.saleId);
  if (!arrSalesId.includes(+id)) {
    const notFoundError = { status: 'SALE_NOT_FOUND', message: 'Sale not found' };
    throw notFoundError;
  }
  const sale = await salesModel.getSaleById(id);
  return sale;
};

const deleteSale = async (id) => {
  const error = await getSaleById(id);
  if (error.status) throw error;
  await salesModel.deleteSale(id);
  return true;
};

const updateSale = async (saleId, saleList) => {
  const notFoundError = await getSaleById(saleId);
  if (notFoundError.status) throw notFoundError;
  const validations = await newSale(saleList);
  // refaturar implementando uma transaction
  await deleteSale(validations.id);
  await salesModel.updateSale(saleId, saleList);
  return { saleId: +saleId, itemsUpdated: validations.itemsSold };
};

module.exports = {
  newSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};