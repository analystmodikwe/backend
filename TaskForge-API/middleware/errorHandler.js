const errorHandler = (err, req, res, next) => {
  // Log the full error server-side for debugging — but never send
  // the stack trace to the client, that's an information leak.
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Something went wrong on the server";

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;