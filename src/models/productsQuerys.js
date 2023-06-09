const querySelectAll = 'SELECT * FROM products;';

const querySelectById = 'SELECT * FROM products WHERE id = ?;';

const queryInsertProducts = 'INSERT INTO products (name) VALUES (?);';

const queryUpdateProduct = 'UPDATE products SET name = ? WHERE id = ?;';

const queryDeleteProduct = 'DELETE FROM products WHERE id = ?;';

const querySearchProduct = `
SELECT * FROM products
WHERE name LIKE ?;`;

module.exports = {
  querySelectAll,
  querySelectById,
  queryInsertProducts,
  queryUpdateProduct,
  queryDeleteProduct,
  querySearchProduct,
};