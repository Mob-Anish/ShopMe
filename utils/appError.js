class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // setting message property to Error Class

    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = true;

    // Capture error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
