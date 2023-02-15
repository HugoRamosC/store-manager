const connection = require('./connection');
const {
  queryInsertSales,
  queryInsertSaleProducts,
  queryListAllSales,
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
  const [products] = await connection.execute(queryListAllSales);
  return products;
};

module.exports = {
  saleRegister,
  newSale,
};