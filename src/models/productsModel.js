const connection = require('./connection');
const {
  querySelectAll,
  querySelectById,
  queryInsertProducts,
} = require('./productsQuerys');

const getAll = async () => {
  const [products] = await connection
    .execute(querySelectAll);
  return products;
};

const getById = async (productId) => {
  const [[product]] = await connection
    .execute(querySelectById, [productId]);
  return product;
};

const createProduct = async ({ name }) => {
  const [newProduct] = await connection
    .execute(queryInsertProducts, [name]);
  return newProduct.insertId;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};