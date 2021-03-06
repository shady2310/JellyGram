const express = require("express");
const cloudinary = require("cloudinary");
const fs = require("fs");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const PostRouter = express.Router();

/////// CLOUDINARY //////

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//EXPLORAR TODAS LAS PUBLICACIONES
/// TODO: poner bien
PostRouter.get("/explore", async (req, res) => {
  let posts = await Post.find({});
  return res.json({
    success: true,
    posts,
  });
});

//NUEVO POST

PostRouter.post("/newPost", (req, res) => {
  try {
    const id = req.body.userId;

    const { description } = req.body;
    // console.log(req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No se ha cargado ningún archivo",
      });
    }

    let imagen = req.files.file;
    // console.log(imagen);

    if (imagen.size > 1024 * 1024 * 2) {
      removeTmp(imagen.tempFilePath);
      return res.status(400).json({
        success: false,
        message: "Archivo demasiado grande",
      });
    }

    if (imagen.mimetype !== "image/jpeg" && imagen.mimetype !== "image/png") {
      removeTmp(imagen.tempFilePath);
      return res.status(400).json({
        success: false,
        message: "Formato de archivo no soportado",
      });
    }

    cloudinary.v2.uploader.upload(
      imagen.tempFilePath,
      { folder: "jellygram" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(imagen.tempFilePath);
        // res.json({
        //   public_id: result.public_id,
        //   url: result.secure_url,
        // });
        let post = new Post({
          image: result.secure_url,
          imageId: result.public_id,
          userId: id,
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
      }
    );
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

// ELIMINAR POSTS

PostRouter.post("/deletePost", async (req, res) => {
  try {
    const id = req.body.userId;
    const { public_id, postId } = req.body;
    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "No se han seleccionado imagenes",
      });
    }

    let postDeleted = await Post.findByIdAndDelete(postId);
    let comentarios = postDeleted.comments;
    let idComentario = postDeleted._id;
    // console.log(postDeleted);

    let eliminarIdUser = await User.findByIdAndUpdate(id, {
      $pull: { posts: idComentario },
    });
    let comentarioDeleted = comentarios.forEach(async (commentId) => {
      // console.log(commentId);
      await Comment.findByIdAndDelete(commentId);
    });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
    });

    res.json({
      success: true,
      message: "Post eliminado correctamente",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

// Like & unLike posts

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
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
});

// POST INDIVIDUAL VER

PostRouter.get("/post/:postId", async (req, res) => {
  const { postId } = req.params;
  // console.log(postId);

  try {
    const singlePost = await Post.findById(
      postId,
      "userId image likes date description comments"
    );
    return res.json({
      success: true,
      singlePost,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

/// ELIMINAR TEMPORALES DE IMAGENES

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = PostRouter;
