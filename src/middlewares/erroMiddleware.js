const { mapError } = require('../utils/errorMap');

const errorMiddleware = (error, _req, res, _next) => res
  .status(mapError(error.type))
  .json({ message: error.message });

module.exports = errorMiddleware;