const express = require("express");
require("dotenv").config();
const User = require("../models/User");
const Storie = require("../models/Storie");
const UserRouter = express.Router();
const moment = require("moment");

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

// TODO: Añadir los errores
let hashToken = bcrypt.hashSync(process.env.TOKEN_WORD, salt);
//////////////////////////////////////////////////////////////// REGISTRO ////////////////////////////////////////////////////////////////

UserRouter.post("/register", async (req, res) => {
  // TODO: COMPROBAR EMAIL Y USERNAME PARA QUE NO EXISTAN YA
  try {
    let { fullname, dateofbirth, gender, username, photo, email, password } =
      req.body;

    password = bcrypt.hashSync(password, salt);

    let user = new User({
      fullname,
      dateofbirth,
      gender,
      username,
      photo,
      email,
      password,
    });
    // TODO: date
    // if(!fullname || !dateofbirth || !gender || !username || !email || !password){
    if (!fullname || !gender || !username || !email || !password) {
      return res.json({
        success: false,
        message: "Debes completar todos los datos marcados con un *",
      });
    }

    const token = jwt.sign({ id: user._id }, hashToken, { expiresIn: 3600 });
    
    let newUser = await user.save();

    return res.json({
      success: true,
      user: newUser,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

//////////////////////////////////////////////////////////////// LOGIN ////////////////////////////////////////////////////////////////

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email, password
    });
    if (!user || !password) {
      return res.json({
        success: false,
        message: "Correo o contraseña incorrectos",
      });
    }

    res.json({
      success: true,
      message: "Te has logueado correctamente",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

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
  // TODO: Que no haga falta poner el username exacto
  // FIXME: QUE NO ENVIE TODOS LOS DATOS DEL USUARIO
  const { username } = req.body;
  let users = await User.find({ username }, "username photo");
  return res.json({
    success: true,
    users,
  });
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
  console.log(req.body.link);
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

//INFORMACION GENERAL DEL PERFIL
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
