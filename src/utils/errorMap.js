const errorMap = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INVALID_VALUE: 422, // Unprocessable Entity
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
}