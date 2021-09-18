const express = require("express");
require("dotenv").config();
const User = require("../models/User");
const Storie = require("../models/Storie");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const UserRouter = express.Router();

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

// TODO: Añadir los errores

//////////////////////////////////////////////////////////////// INICIO ////////////////////////////////////////////////////////////////
// TODO: YO y mis usuarios seguidos
UserRouter.get("/home", async (req, res) => {
  const id = req.body.userId;

  const user = await User.findById(id, "username following photo");
  if (!user) {
    return res.status(404).send({ error: "Could not find user." });
  }
  const following = user.following.map((followingId) =>
    mongoose.Types.ObjectId(followingId)
  );

  // console.log(user);

  const camposOmitidosAutor = [
    "author.password",
    "author.email",
    "author.links",
    "author.followers",
    "author.following",
    "author.gender",
    "author.fullname",
    "author.savedposts",
    "author.dateofbirth",
    "author.stories",
    "author.posts",
  ];

  try {
    // console.log(following);

    const posts = await Post.aggregate([
      {
        $match: {
          $or: [{ userId: { $in: following } }, { userId: { id } }],
        },
      },
      { $sort: { date: -1 } },
      // { $skip: Number() },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unset: camposOmitidosAutor,
      },
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              // Comentarios relacionados con el postId
              $match: {
                $expr: {
                  $eq: ["$post", "$$postId"],
                },
              },
            },
            { $sort: { date: -1 } },
            { $limit: 3 },
            // Populating del autor del comment
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "author",
              },
            },
            {
              $unwind: "$author",
            },
            {
              $unset: camposOmitidosAutor,
            },
          ],
          as: "comments",
        },
      },
    ]);
    return res.send(posts);
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//////////////////////////////////////////////////////////////// Buscar USER by Username ////////////////////////////////////////////////////////////////

UserRouter.get("/searchUser", async (req, res) => {
  // const id  = req.body.userId;
  const { username } = req.body;
  try {
    let users = await User.find(
      { username: { $regex: username, $options: "i" } },
      "username photo"
    );

    if (!username) {
      return res.json({
        success: false,
        message: "Debes introducir un nombre de usuario",
      });
    }

    if (users == 0) {
      return res.json({
        success: false,
        message: "No se han econtrado usuarios",
      });
    } else {
      return res.json({
        success: true,
        users,
      });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//////////////////////////////////////////////////////////////// AJUSTES ////////////////////////////////////////////////////////////////

//INFO DEL USUARIO

UserRouter.get("/settings", async (req, res) => {
  const id = req.body.userId;

  try {
    let userInfo = await User.findById(
      id,
      "fullname gender username photo email"
    );
    res.json({
      userInfo,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// CAMBIO DE DATOS
UserRouter.put("/settings", async (req, res) => {
  const id = req.body.userId;
  const { fullname, gender, username, photo, email } = req.body;

  try {
    if (!fullname || !gender || !username || !email) {
      return res.json({
        success: false,
        message: "No puedes dejar datos en blanco",
      });
    }
    await User.findByIdAndUpdate(id, {
      fullname,
      gender,
      username,
      photo,
      email,
    });
    res.json({
      success: true,
      message: "Datos actualizados correctamente",
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// CAMBIO DE CONTRASEÑA

UserRouter.put("/settings/password", async (req, res) => {
  const id = req.body.userId;
  let { password } = req.body;

  try {
    password = bcrypt.hashSync(password, salt);
    await User.findByIdAndUpdate(id, { password });
    res.json({
      success: true,
      message: "Contraseña cambiada correctamente",
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ENLACES

UserRouter.put("/settings/links", async (req, res) => {
  const id = req.body.userId;
  const { link } = req.body;

  try {
    let usuario = await User.findByIdAndUpdate(
      id,
      { $push: { links: link } },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Enlaces cambiados correctamente",
      usuario,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//////////////////////////////////////////////////////////////// PERFIL ////////////////////////////////////////////////////////////////
// TODO: RUTA PARA MI PERFIL CON EL TOKEN

// Mi perfil
UserRouter.get("/myProfile", async (req, res) => {
  const id = req.body.userId;
  try {
    const myProfile = await User.findById(
      id,
      "username photo followers following"
    );
    res.json({
      success: true,
      myProfile,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//INFORMACION GENERAL DEL PERFIL PARA OTRO USER
UserRouter.get("/profile", async (req, res) => {
  const id = req.body.userId;
  try {
    const userProfile = await User.findById(
      id,
      "username photo followers following"
    );
    res.json({
      success: true,
      userProfile,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// FOLLOW / UNFOLLOW A USUARIO

UserRouter.post("/follow", async (req, res) => {
  const { follower, following, action } = req.body;
  try {
    switch (action) {
      case "follow":
        await Promise.all([
          User.findByIdAndUpdate(follower, {
            $push: { following: following },
          }),
          User.findByIdAndUpdate(following, {
            $push: { followers: follower },
          }),
        ]);
        break;

      case "unfollow":
        await Promise.all([
          User.findByIdAndUpdate(follower, {
            $pull: { following: following },
          }),
          User.findByIdAndUpdate(following, {
            $pull: { followers: follower },
          }),
        ]);
        break;

      default:
        break;
    }

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// USERS QUE SIGUES

UserRouter.get("/following", async (req, res) => {
  const id = req.body.userId;

  try {
    let following = await User.findById(id, "following");

    res.json({
      success: true,
      following,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//POSTS DEL USUARIO

UserRouter.get("/profile/posts", async (req, res) => {
  const id = req.body.userId;
  try {
    const posts = await User.findById(id, "posts");
    res.json({
      success: true,
      posts,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// POST GUARDADOS

UserRouter.get("/profile/saved", async (req, res) => {
  const id = req.body.userId;
  try {
    const savedpost = await User.findById(id, "savedpost");
    res.json({
      success: true,
      savedpost,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//ENLACES DEL PERFIL

UserRouter.get("/profile/links", async (req, res) => {
  const id = req.body.userId;
  const links = await User.findById(id, "links");
  res.json({
    success: true,
    links,
  });
});

//////////////////////////////// HISTORIAS //////////////////////////////

// HISTORIAS DEL USUARIO

UserRouter.get("/stories", async (req, res) => {
  const id = req.body.userId;
  const stories = await User.findById(id, "stories");
  res.json({
    success: true,
    stories,
  });
});

// POSTEAR HISTORIA
UserRouter.put("/stories/:userId", async (req, res) => {
  const { userId } = req.params;
  // const userId = req.params.id
  const { image } = req.body;
  const date = new Date();
  const storie = await Storie.create({
    userId,
    image,
    date,
  });
  await User.findByIdAndUpdate(userId, { $push: { stories: storie._id } });
  res.json({
    success: true,
    message: "Historia publicada correctamente",
    storie,
  });
});

// TODAS LAS HISTORIAS
// TODO: Hacer la ruta de las historias y que se borren
UserRouter.get("/ruta", async (req, res) => {
  res.json({
    message: "true",
  });
});

module.exports = UserRouter;
