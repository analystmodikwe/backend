const express = require("express")

const app = express();

// for routes
const router = require("./routes/taskRoutes");

// parsing JSON
app.use(express.json());