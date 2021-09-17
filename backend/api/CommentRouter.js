const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const CommentRouter = express.Router();

//NUEVO COMENTARIO

CommentRouter.post("/newComment", async (req, res) => {
  const id  = req.body.userId;
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

// CommentRouter.get("/", async (req, res) => {
//   let comments = await Comment.find({});
//   return res.json({
//     success: true,
//     comments,
//   });
// });

module.exports = CommentRouter;
