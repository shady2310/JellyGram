const express = require("express");
const User = require("../models/User");

const AuthRouter = express();

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
let hashToken = bcrypt.hashSync(process.env.TOKEN_WORD, salt);


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
  
  AuthRouter.post("/login", async (req, res) => {
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

module.exports = AuthRouter;