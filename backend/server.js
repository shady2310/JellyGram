const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const { PORT, DB_URI } = process.env;

mongoose
  .connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log(`DB connection sucessfully!`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send({
    success: true,
    message: "Hola",
  });
});

app.get("/hello", (req, res) => {
  return res.send({
    success: true,
    word: "Hello World!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} sucessfully`);
});
