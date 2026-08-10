const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);

  error.statusCode = 404;

  next(error);
};

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
};