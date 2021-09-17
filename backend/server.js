const express = require("express");
require("dotenv").config();
const app = express();
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");

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

/////// Dependencies use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// Routers use
app.use("/auth", AuthRouter);
app.use("/user", Auth, UserRouter);
app.use("/post", Auth, PostRouter);
app.use("/comment", Auth, CommentRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} sucessfully`);
});
