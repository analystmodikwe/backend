const express = require("express")

const app = express();

// for routes
const router = require("./routes/taskRoutes");
// logger middleware
const logger = require("./middleware/logger");
// errorHandler middleware
errorHandler = require("./middleware/errorHandler");



// parsing JSON
app.use(express.json());

// Catches malformed JSON thrown by express.json() before it reaches any route. when a client sends garbage JSON in the body
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Malformed JSON in request body" });
  }
  next(err);
});

// logger
app.use(logger);
// static files
app.use(express.static("public"));
// use the router for a routes with API
app.use("/api", router);
// errorhandler
app.use(errorHandler);


//  starting the server with a port 3500
const PORT = 3500;

app.listen(PORT, () =>{
    console.log(`this server is running on http://localhost:${PORT}/api/tasks`)
});