const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  let token = req.headers.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token not provided",
    });
  }

  jwt.verify(token, process.env.TOKEN_WORD, (error, decoded) => {
    // console.log(error);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid Authentication",
      });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
};

module.exports = Auth;
