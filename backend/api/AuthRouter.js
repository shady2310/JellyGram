const express = require("express");
const User = require("../models/User");

const AuthRouter = express();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const tokenWord = process.env.TOKEN_WORD;

//////////////////////////////////////////////////////////////// REGISTRO ////////////////////////////////////////////////////////////////

AuthRouter.post("/register", async (req, res) => {
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

    let newUser = await user.save();

    const token = jwt.sign({ id: user._id }, tokenWord, { expiresIn: 3600 });

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

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user || !password) {
    return res.status(404).json({
      sucess: false,
      message: "Debes introducir un email y una contraseña",
    });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      jwt.sign({ id: user._id }, tokenWord, { expiresIn: 3600 });
      res.json({
        success: true,
        message: "Te has logueado correctamente",
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Correo o contraseña incorrectos",
      });
    }
  } catch {
    res.status(500).send();
  }
});

module.exports = AuthRouter;
