const express = require("express");
const User = require("../models/User");

const AuthRouter = express();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const hashToken = bcrypt.hashSync(process.env.TOKEN_WORD, salt);

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

    const accesstoken = createAccessToken({ id: newUser._id });

    // const token = jwt.sign({ id: user._id }, hashToken, { expiresIn: 3600 });

    return res.json({
      success: true,
      user: newUser,
      accesstoken,
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
      const createAccessToken = (user) => {
        return jwt.sign({ id: user._id }, hashToken, { expiresIn: 3600 });
      };
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
