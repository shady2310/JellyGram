const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const multer  = require('multer')

// const moment = require("moment");

// Routers require
const AuthRouter = require("./api/AuthRouter");
const UserRouter = require("./api/UserRouter");
const PostRouter = require("./api/PostRouter");
const CommentRouter = require("./api/CommentRouter");

// Middlewares require
const Auth = require("./middlewares/Auth");

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
app.use(fileupload({
  useTempFiles: true,
}))

// Routers use
app.use("/auth", AuthRouter);
app.use("/user", Auth, UserRouter);
app.use("/post", PostRouter);
app.use("/comment", CommentRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} sucessfully`);
});
