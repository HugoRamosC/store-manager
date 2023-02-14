const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  
  return products;
};

const getById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);

  return product;
};

const createProduct = async ({ name }) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [newProduct] = await connection.execute(query, [name]);
  console.log('kkkkkkkkkk', newProduct);
  return newProduct.insertId;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};