const queryInsertSales = 'INSERT INTO sales (date) VALUES(NOW());';

const queryInsertSaleProducts = `
INSERT INTO 
sales_products (sale_id, product_id, quantity)
VALUE (?, ?, ?);`;

const queryListAllSales = `
SELECT 
  SP.sale_Id AS saleId, 
  S.date, 
  SP.product_id AS productId, 
  SP.quantity
FROM sales_products AS SP
INNER JOIN sales AS S
  ON SP.sale_id = S.id
ORDER BY saleId ASC, productId ASC;`;

const queryGetSaleById = `
SELECT
  S.date, 
  SP.product_id AS productId, 
  SP.quantity
FROM sales_products AS SP
INNER JOIN sales AS S
  ON SP.sale_id = S.id
WHERE SP.sale_id = ?;`;

// https://stackoverflow.com/questions/1233451/delete-from-two-tables-in-one-query
const queryDeleteSale = `
DELETE
  SP,
  S
FROM sales_products AS SP
INNER JOIN sales AS S
WHERE SP.sale_id = S.id
AND SP.sale_id = ?;`;

const queryUpdateSale = `
UPDATE
  sales_products
SET
  quantity = ?
WHERE product_id = ? AND sale_id = ?;`;

module.exports = {
  queryInsertSales,
  queryInsertSaleProducts,
  queryListAllSales,
  queryGetSaleById,
  queryDeleteSale,
  queryUpdateSale,
};