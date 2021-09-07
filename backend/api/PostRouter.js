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

//LIKE

// PostRouter.put("/follow/:id", async (req, res) => {
//   const { id } = req.params;
//   const { followId } = req.body;
//   let user = await User.findByIdAndUpdate(
//     id,
//     { $push: { following: followId } },
//     { new: true }
//   );
//   res.json({
//     success: true,
//     user,
//   });
// });

// UNLIKE
// PostRouter.put("/unfollow/:id", async (req, res) => {
//   const { id } = req.params;
//   const { followId } = req.body;
//   let user = await User.findByIdAndUpdate(
//     id,
//     { $pull: { following: followId } },
//     { new: true }
//   );
//   res.json({
//     success: true,
//     user,
//   });
// });

// TODO: POST INDIVIDUAL VER
// TODO: RUTA DE COMENTARIOS POST

module.exports = PostRouter;
