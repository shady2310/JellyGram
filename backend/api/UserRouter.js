const express = require("express");
require("dotenv").config();
const User = require("../models/User");
const Storie = require("../models/Storie");
const Post = require("../models/Post");
const ObjectId = require("mongoose").Types.ObjectId;
const UserRouter = express.Router();

// TODO: Añadir los errores

//////////////////////////////////////////////////////////////// INICIO ////////////////////////////////////////////////////////////////
// TODO: YO y mis usuarios seguidos
UserRouter.get("/home/:id", async (req, res) => {
  const { id } = req.params;
  // const user = await User.findById(id, "username following photo");
  // const followingIds = user.following;
  // console.log(followingIds);

  const user = await User.findById(id, "username following photo");
  if (!user) {
    return res.status(404).send({ error: "Could not find user." });
  }
  const following = user.following.map((following) => following);

  // console.log(user);
  // console.log(following);
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          $expr: {
            $or: [{ userId: { $in: [following, "$following"]} }, { userId: { id } }],
          },
        },
      },
      // {
      //   $match: {
      //     $or: [{ userId: { $in: following } }, { userId: { id } }],
      //   },
      // },
      // { $sort: { date: -1 } },
      // { $skip: Number() },
      // { $limit: 5 },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "userId",
      //     foreignField: "_id",
      //     as: "user",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "posts",
      //     localField: "_id",
      //     foreignField: "post",
      //     as: "post",
      //   },
      // },
    ]);
    // console.log(posts);
    return res.send(posts);
  } catch (err) {
    res.json({ success: false, message: err.message });
  }

  // let usersIds = [];
  // followingIds.forEach((userIds) => {
  //   usersIds.push(userIds);
  // });
  // // console.log(followingIds);
  // console.log(usersIds);
  // let usersInfo = [];
  // usersIds.forEach((userId) => {
  //   let info = User.findById(userId, "username posts");
  //   usersInfo.push(info);
  //   // console.log(info);
  // });

  // console.log(usersInfo.schema);

  // let posts = users.posts.forEach(async (post) => {
  //   console.log(post);
  // });
  // let postsImages = await Post.findById(users.posts)

  // console.log(postsImages);

  // return res.json({
  //   success: true,
  //   user,
  // });
});

//////////////////////////////////////////////////////////////// Buscar USER by Username ////////////////////////////////////////////////////////////////

UserRouter.get("/searchUser", async (req, res) => {
  // const { id } = req.params;
  const { username } = req.body;
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
});

//////////////////////////////////////////////////////////////// AJUSTES ////////////////////////////////////////////////////////////////

//INFO DEL USUARIO

UserRouter.get("/settings/:id", async (req, res) => {
  const { id } = req.params;
  let userInfo = await User.findById(
    id,
    "fullname gender username photo email"
  );
  res.json({
    userInfo,
  });
});

// CAMBIO DE DATOS
UserRouter.put("/settings/:id", async (req, res) => {
  const { id } = req.params;
  const { fullname, gender, username, photo, email } = req.body;
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
});

// CAMBIO DE CONTRASEÑA

UserRouter.put("/settings/password/:id", async (req, res) => {
  // TODO: Encriptar contraseña
  const { id } = req.params;
  const { password } = req.body;
  await User.findByIdAndUpdate(id, { password });
  res.json({
    success: true,
    message: "Contraseña cambiada correctamente",
  });
});

// ENLACES

UserRouter.put("/settings/links/:id", async (req, res) => {
  const { id } = req.params;
  const { link } = req.body;
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
});

//////////////////////////////////////////////////////////////// PERFIL ////////////////////////////////////////////////////////////////
// TODO: RUTA PARA MI PERFIL CON EL TOKEN

// Mi perfil
UserRouter.get("/myProfile/:id", async (req, res) => {
  const { id } = req.params;
  const myProfile = await User.findById(
    id,
    "username photo followers following"
  );
  res.json({
    success: true,
    myProfile,
  });
});

//INFORMACION GENERAL DEL PERFIL PARA OTRO USER
UserRouter.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const userProfile = await User.findById(
    id,
    "username photo followers following"
  );
  res.json({
    success: true,
    userProfile,
  });
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
    res.json({ success: false, err });
  }
});

// USERS QUE SIGUES

UserRouter.get("/following/:id", async (req, res) => {
  const { id } = req.params;

  let following = await User.findById(id, "following");

  res.json({
    success: true,
    following,
  });
});

//POSTS DEL USUARIO

UserRouter.get("/profile/posts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await User.findById(id, "posts");
  res.json({
    success: true,
    posts,
  });
});

// POST GUARDADOS

UserRouter.get("/profile/saved/:id", async (req, res) => {
  const { id } = req.params;
  const savedpost = await User.findById(id, "savedpost");
  res.json({
    success: true,
    savedpost,
  });
});

//ENLACES DEL PERFIL

UserRouter.get("/profile/links/:id", async (req, res) => {
  const { id } = req.params;
  const links = await User.findById(id, "links");
  res.json({
    success: true,
    links,
  });
});

//////////////////////////////// HISTORIAS //////////////////////////////

// HISTORIAS DEL USUARIO

UserRouter.get("/stories/:id", async (req, res) => {
  const { id } = req.params;
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
