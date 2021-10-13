const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const CommentRouter = express.Router();

//NUEVO COMENTARIO

CommentRouter.post("/newComment", async (req, res) => {
  const id = req.body.userId;
  const { comment, postId } = req.body;
  // TODO: arreglar id
  let comentario = new Comment({
    userId,
    comment,
    post: postId,
  });

  let newComment = await comentario.save();

  let commentPost = await Post.findByIdAndUpdate(id, {
    $push: { comments: newComment._id },
  });

  return res.json({
    success: true,
    comment: newComment,
    // commentPost,
  });
});

//COMENTARIOS

CommentRouter.get("/getComment/:commentId", async (req, res) => {
  const { commentId } = req.params;
  // const id = req.body;
  let comments = await Comment.findById(commentId);

  let userId = comments.userId;
  // console.log(comments.userId);

  const userInfo = await User.findById(userId, "username photo");
  return res.json({
    success: true,
    comments,
    userInfo,
  });
});

module.exports = CommentRouter;
