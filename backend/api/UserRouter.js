const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();

// LISTAR TODOS LOS USUARIOS

UserRouter.get("/", async (req, res) => {
  let users = await User.find({});
  return res.json({
    success: true,
    users,
  });
});

//BUSCAR POR ID

UserRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  let users = await User.findById(id);
  return res.json({
    success: true,
    users,
  });
});

//REGISTRO

UserRouter.post("/register", async (req, res) => {
  const { fullname, dateofbirth, gender, username, photo, email, password } =
    req.body;

  let user = new User({
    fullname,
    dateofbirth,
    gender,
    username,
    photo,
    email,
    password,
  });

  if(!fullname || !dateofbirth || !gender || !username || !email || !password){
    return res.json({
      success: false,
      message: "Debes completar todos los datos marcados con un *",
    });
  }

  let newUser = await user.save();
  return res.json({
    success: true,
    user: newUser,
  });
});


//LOGIN

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
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
});


// AJUSTES

UserRouter.get("/settings", async (req, res) => {
  const {fullname, dateofbirth, gender, username, photo, email} = req.body;
  const { id } = req.params;
  let userInfo = await User.findById(id);

})

UserRouter.post("/settings/password", async (req, res) => {

})

// PERFIL

UserRouter.get("/profile", async (req, res) => {
  const {username, photo, followers, following, post} = req.body;
})

UserRouter.get("/profile/saved", async (req, res) => {
  const {savedpost} = req.body;
})

UserRouter.get("/profile/links", async (req, res) => {
  const {links} = req.body;
})

module.exports = UserRouter;
