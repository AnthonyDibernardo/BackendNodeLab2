const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

// Shows HTTP requests in the console
app.use(morgan("dev"));

// CORS to allow requests from any origin
app.use(cors());

// Create API endpoint 
app.use("/api/trivia", require("./routes/trivia"));

module.exports = app;