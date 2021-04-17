class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // setting message property to Error Class

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Capture error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
