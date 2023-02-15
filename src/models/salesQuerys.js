const queryInsertSales = 'INSERT INTO sales (date) VALUES(NOW())';

const queryInsertSaleProducts = `
INSERT INTO sales_products (sale_id, product_id, quantity) 
VALUES (? ? ?)`;

const queryListAllSales = `
SELECT 
  SP.sale_Id AS saleId, 
  S.date, 
  SP.product_id AS productId, 
  SP.quantity
FROM sales_products AS SP
INNER JOIN sales AS S
  ON AS.sale_id = S.id`;

module.exports = {
  queryInsertSales,
  queryInsertSaleProducts,
  queryListAllSales,
};