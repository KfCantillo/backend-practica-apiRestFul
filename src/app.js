const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
const router = require("./routes");

// Db connection
const { mongoose } = require("./config/database");

// Middlewares
app.use(fileUpload());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
router(app);

// Static Files
app.use(express.static(path.join(__dirname, "../public")));

module.exports = app;
