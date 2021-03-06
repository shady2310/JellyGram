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

    // if(!fullname || !dateofbirth || !gender || !username || !email || !password){
    if (!fullname || !username || !email || !password) {
      return res.json({
        success: false,
        message: "Debes completar todos los campos",
      });
    }

    if (!photo) {
      photo = "https://st3.depositphotos.com/19428878/36349/v/600/depositphotos_363499050-stock-illustration-default-avatar-profile-vector-user.jpg";
    }

    let regex =
      /^(([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|es|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b))$/;

    if (email.match(regex)) {
      return res.json({
        success: false,
        message: "Email no valido",
      });
    }

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

    let newUser = await user.save();

    const token = jwt.sign({ id: user._id }, tokenWord, { expiresIn: "1h" });

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
    return res.json({
      sucess: false,
      message: "Debes introducir un email y una contrase??a validos",
    });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, tokenWord, { expiresIn: "1h" });
      res.json({
        success: true,
        message: "Te has logueado correctamente",
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Correo o contrase??a incorrectos",
      });
    }
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
});

module.exports = AuthRouter;
