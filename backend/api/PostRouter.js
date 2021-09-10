const express = require("express");
const cloudinary = require("cloudinary");
const fs = require("fs");
const Post = require("../models/Post");
const User = require("../models/User");
const PostRouter = express.Router();

/////// CLOUDINARY //////

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//EXPLORAR TODAS LAS PUBLICACIONES

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
    // const id = req.params.id;
    // console.log(req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No se ha cargado ningún archivo",
      });
    }

    let imagen = req.files.imagen;
    console.log(imagen);

    // const { description } = req.body;

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
        res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );

    // let post = new Post({
    //   image,
    //   description,
    // });

    // let newPost = await post.save();

    // let userPost = await User.findByIdAndUpdate(id, {
    //   $push: { posts: newPost._id },
    // });

    // return res.json({
    //   success: true,
    //   post: newPost,
    // });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ELIMINAR POSTS

PostRouter.post("/deletePost", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "No se han seleccionado imagenes",
      });
    }

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if(err) throw err;
      res.json({
        success: true,
        message: "Imagen eliminada",
      })
    })
    
  } catch (err) {
    return res.status(500).json({
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
