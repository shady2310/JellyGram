const express = require("express");

require("dotenv").config();



const app = express();


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

let port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port} sucessfully`);
});
