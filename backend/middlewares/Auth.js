const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  let token = req.headers.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token not provided",
    });
  }

  jwt.verify(token, process.env.TOKEN_WORD, (error, user) => {
    console.log(error);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid Authentication",
      });
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = Auth;

// const jwt = require('jsonwebtoken')
// const auth = (req, res, next) =>{
//      try {
//          const token = req.header("Authorization")
//          if(!token)
//          return res.status(400).json({msg: "Invalid Authentication"})
//          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
//              if(err) return res.status(400).json({msg: "Invalid Authentication"})
//              req.user = user
//              next()
//             }) } catch (err) { return res.status(500).json({msg: err.message}) }}
//  module.exports = auth
