const errorMap = {
  NAME_IS_REQUIRED: 400,
  PRODUCT_IS_REQUIRED: 400,
  QUANTITY_IS_REQUIRED: 400,
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};