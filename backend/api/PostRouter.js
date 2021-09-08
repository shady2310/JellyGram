const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
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

PostRouter.post("/newpost/:id", async (req, res) => {
  const id = req.params.id;
  const { image, description } = req.body;

  let post = new Post({
    image,
    description,
  });

  let newPost = await post.save();

  let userPost = await User.findByIdAndUpdate(id, {
    $push: { posts: newPost._id },
  });

  return res.json({
    success: true,
    post: newPost,
  });
});

// TODO: Hacer la ruta de los likes para los post

PostRouter.post("/like", async (req, res) => {
  const { userId, postId, action } = req.body;
  try {
    switch (action) {
      case "like":
        await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
        break;

      case "unlike":
        await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      break;

      default:
        break;
    }

    return res.json({
      success: true,
    })
    
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
});

// POST INDIVIDUAL VER

PostRouter.get("/post", async (req, res) => {
  const { postId } = req.body;
  try {
    const singlePost = await Post.findById(postId, "userId image likes date description comments")
    return res.json({
      success: true,
      singlePost,
    })
  } catch(err){
    res.json({
      success: false,
    })
  }
})

// TODO: RUTA DE COMENTARIOS POST

module.exports = PostRouter;
