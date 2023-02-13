const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const products = await connection.execute(query);
  return products;
};

const getById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const product = connection.execute(query, [productId]);
  return product;
};

module.exports = {
  getAll,
  getById,
};