const express = require("express");
const connectDb = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const { apiRouter } = require("./routes");
const cookieParser = require("cookie-parser");

// connecting to mongodb
connectDb();

const app = express();

// middlewares
app.use(cors()); // cross origin resource
app.use(express.json()); // parsing req.body
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(bodyParser.json()); // alternative
app.use(cookieParser());
app.use(express.static("dist"));

// routes
app.use("/api/v1", apiRouter);

// client routes handling
app.use("/*", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "dist", "index.html"))
})

module.exports = app;