const express = require("express");
require("dotenv").config();
const User = require("../models/User");
const Storie = require("../models/Storie");
const UserRouter = express.Router();

const jwt = require("jsonwebtoken")

// TODO: Añadir los errores


//////////////////////////////////////////////////////////////// INICIO ////////////////////////////////////////////////////////////////
// TODO: YO y mis usuarios seguidos
UserRouter.get("/", async (req, res) => {
  let users = await User.find({});
  return res.json({
    success: true,
    users,
  });
});

//////////////////////////////////////////////////////////////// Buscar USER by Username ////////////////////////////////////////////////////////////////

UserRouter.get("/searchUser", async (req, res) => {
  // const { id } = req.params;
  // TODO: Que no haga falta poner el username exacto y poner error al no encontrar al usuario
  const { username } = req.body;
  let users = await User.find({ username: {$regex: username, $options: "i"} }, "username photo");

  if(!username){
    return res.json({
      success: false,
      message: "Debes introducir un nombre de usuario"
    })
  }

  if (users == 0){
    return res.json({
      success: false,
      message: "No se han econtrado usuarios",
    });
  }else {
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
  // console.log(req.body.link);
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
// TODO: Follow/unfollow

UserRouter.put("/un&follow/:id", async (req, res) => {
// if (isFollowing == false) {
//   await User.findByIdAndUpdate(user._id, {
//     $push: { following: followedId },
//   });
// } else if (isFollowing == true) {
//   await User.findByIdAndUpdate(user._id, {
//     $pull: { following: followedId },
//   });
// }
// // user = lo cogemos con el token -  y sabemos si el usuario esta logueado o no 


// user.following.forEach((populatedElement) => {
//   if (populatedElement._id == followedId) {
//     isFollowing = true;
//   }
// });
})



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
