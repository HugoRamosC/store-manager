const connection = require('./connection');

const newSale = async (saleList) => {
  const querylastSale = 'SELECT MAX(sale_id) FROM sales_products;';
  const queryProducts = 'INSERT INTO sales_products (sale_id, product_id, quantity VALUES(? ? ?)';
  const querySales = 'INSERT INTO sales (date) VALUES(NOW())';

  await connection.execute(querySales);

  const id = connection.execute(querylastSale);

  const itemsSold = await Promise.all(saleList.map((product) => {
    const saleRegistred = connection.execute(
      queryProducts, [id, product.productId, product.quantity],
    );
    return saleRegistred;
  }));

  return { id, itemsSold };
};

module.exports = {
  newSale,
};