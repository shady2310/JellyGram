const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const CommentRouter = express.Router();

//NUEVO COMENTARIO

CommentRouter.post("/newComment/:id", async (req, res) => {
  const { id } = req.params;
  const { comment, userId } = req.body;

  let comentario = new Comment({
    userId,
    comment,
  });

  let newComment = await comentario.save();

  let commentPost = await Post.findByIdAndUpdate(id, {
    $push: { comments: newComment._id },
  });

  return res.json({
    success: true,
    comment: newComment,
    commentPost,
  });
});
// TODO: findbyidandupdate y $push de la id del post (newpost._Id) a la array del user a posts Y LO MISMO CON LOS COMENTARIOS SOBRE LOS POSTS

//COMENTARIOS

CommentRouter.get("/", async (req, res) => {
  let comments = await Comment.find({});
  return res.json({
    success: true,
    comments,
  });
});

module.exports = CommentRouter;
