const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { sendResponse } = require("./utils/sendResponse");
const router = require("./api/index");

const app = express();
require("dotenv").config();

// var SECRET_TOKEN = process.env.SECRET_TOKEN;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", router);
app.use(function(err, req, res, next) {
  console.error(err);
  console.log(err.stack);
  sendResponse(
    res,
    500,
    "An uncaught exception occured on the server. Please run `now logs [DEPLOYMENT_URL]` on the commandline to debug."
  );
  next();
});

module.exports = app;
