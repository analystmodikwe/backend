// A custom error type that carries an HTTP status code along with it.
// This lets us throw errors that already know what response code they deserve,
// instead of guessing in the error handler.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;