const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const moment = require("moment");

// Routers require
const AuthRouter = require("./api/AuthRouter");
const UserRouter = require("./api/UserRouter");
const PostRouter = require("./api/PostRouter");
const CommentRouter = require("./api/CommentRouter");

// Middlewares require
const tokenValidation = require("./middlewares/tokenValidation");

// DB connection
const { PORT, DB_URI } = process.env;
mongoose
  .connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`DB connection sucessfully!`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers use
app.use("/auth", AuthRouter);
app.use("/user", tokenValidation, UserRouter);
app.use("/post", PostRouter);
app.use("/comment", CommentRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} sucessfully`);
});
