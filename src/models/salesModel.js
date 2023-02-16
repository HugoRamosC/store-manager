const camelize = require('camelize');
const connection = require('./connection');
const {
  queryInsertSales,
  queryInsertSaleProducts,
  queryListAllSales,
  queryGetSaleById,
  queryDeleteSale,
  queryUpdateSale,
} = require('./salesQuerys');

const saleRegister = async () => {
  const [sale] = await connection.execute(queryInsertSales);
  return sale.insertId;
};

const newSale = async (id, saleList) => {
  await Promise.all(saleList.map(async (product) => {
    await connection.execute(
      queryInsertSaleProducts, [id, product.productId, product.quantity],
    );
  }));
};

const getSales = async () => {
  const [sales] = await connection.execute(queryListAllSales);
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(queryGetSaleById, [id]);
  return camelize(sale);
};

const deleteSale = async (id) => {
  await connection.execute(queryDeleteSale, [id]);
};

const updateSale = async (saleId, saleList) => {
  await Promise.all(saleList.map(async (product) => {
    await connection.execute(
      queryUpdateSale, [product.quantity, product.productId, saleId],
    );
  }));
};

module.exports = {
  saleRegister,
  newSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};