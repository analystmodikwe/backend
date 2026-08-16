const express = require("express")

const app = express();

// for routes
const router = require("./routes/taskRoutes");

// static files
app.use(express.static("public"));

// parsing JSON
app.use(express.json());

// logger middleware
const logger = require("./middleware/logger");
app.use(logger);

// use the router for a routes with API
app.use("/api", router);

//  starting the server with a port 3500
const PORT = 3500;

app.listen(PORT, () =>{
    console.log(`this server is running on http://localhost:${PORT}/api/tasks`)
});