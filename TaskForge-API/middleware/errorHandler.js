const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Malformed JSON thrown by express.json() lands here automatically
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "Malformed JSON in request body" });
  }


  // Log the full error server-side for debugging — but never send
  // the stack trace to the client, that's an information leak.
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Something went wrong on the server";

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;