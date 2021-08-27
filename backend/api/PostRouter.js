const express = require("express");
const Post = require("../models/Post");
const PostRouter = express.Router();


//EXPLORAR TODAS LAS PUBLICACIONES

PostRouter.get("/explore", async (req, res) => {
  let posts = await Post.find({});
  return res.json({
    success: true,
    posts,
  });
});

//NUEVO POST

PostRouter.post("/newpost", async (req, res) => {
  const { image, description } = req.body;

  let post = new Post({
    image,
    description,
  });

  let newPost = await post.save();
  return res.json({
    success: true,
    post: newPost,
  });
});


module.exports = PostRouter;
