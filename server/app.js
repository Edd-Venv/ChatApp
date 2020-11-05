const app = require("express")();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const compression = require("compression");

const signUpRouter = require("./routes/signUp");

const fileStorage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(multer({ storage: fileStorage, fileFilter }).single("photo"));

app.use(compression());
app.use(bodyParser.json());

app.use(
  "/public/icons",
  express.static(path.join(__dirname, "public", "icons"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(signUpRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});

module.exports = app;
