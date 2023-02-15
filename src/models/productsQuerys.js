const querySelectAll = 'SELECT * FROM products;';

const querySelectById = 'SELECT * FROM products WHERE id = ?;';

const queryInsertProducts = 'INSERT INTO products (name) VALUES (?);';

module.exports = {
  querySelectAll,
  querySelectById,
  queryInsertProducts,
};