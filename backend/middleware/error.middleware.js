const errorMiddleware = (err, req, res, next) => {
  console.error("ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Mongoose CastError
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // Mongoose ValidationError
  if (err.name === "ValidationError") {
    statusCode = 400;

    const messages = Object.values(err.errors).map(
      (error) => error.message
    );

    message = messages.join(", ");
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists`;
  }

  // Multer errors
  if (err.name === "MulterError") {
    statusCode = 400;

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File size must be less than 5MB";
    } else {
      message = err.message;
    }
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;