const ApiError = require("../utils/ApiError");

const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid authentication token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Authentication token expired" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate value error" });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
