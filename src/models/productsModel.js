const connection = require('./connection');
const {
  querySelectAll,
  querySelectById,
  queryInsertProducts,
  queryUpdateProduct,
  queryDeleteProduct,
  querySearchProduct,
} = require('./productsQuerys');

const getAll = async () => {
  const [products] = await connection.execute(querySelectAll);
  return products;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(querySelectById, [productId]);
  console.log(product);
  if (!product) return false;
  return product;
};

const createProduct = async (name) => {
  const [newProduct] = await connection.execute(queryInsertProducts, [name]);
  return newProduct.insertId;
};

const updateProduct = async (id, newName) => {
  await connection.execute(queryUpdateProduct, [newName, id]);
};

const deleteProduct = async (id) => {
  await connection.execute(queryDeleteProduct, [id]);
};

const searchProduct = async (searchTerm) => {
  const [productsFound] = await connection
    .execute(querySearchProduct, [`%${searchTerm}%`]);
  return productsFound;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};