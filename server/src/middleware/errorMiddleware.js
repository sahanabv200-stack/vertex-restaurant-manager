const ApiError = require("../utils/ApiError");

function errorMiddleware(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  if (statusCode === 500) {
    console.error(error);
  }

  const apiError = error instanceof ApiError
    ? error
    : new ApiError(statusCode, message, error.details || null);

  res.status(apiError.statusCode).json({
    success: false,
    message: apiError.message,
    details: apiError.details,
  });
}

module.exports = errorMiddleware;
