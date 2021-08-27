const express = require("express");
const Comment = require("../models/Comment");
const CommentRouter = express.Router();


//NUEVO COMENTARIO

CommentRouter.post("/", async (req, res) => {
  const { comment } = req.body;

  let comentario = new Comment({
    comment,
  });

  let newComment = await comentario.save();
  return res.json({
    success: true,
    comment: newComment,
  });
});


//COMENTARIOS

CommentRouter.get("/", async (req, res) => {
  let comments = await Comment.find({});
  return res.json({
    success: true,
    comments,
  });
});

module.exports = CommentRouter;
