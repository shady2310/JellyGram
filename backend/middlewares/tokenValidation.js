const jwt = require('jsonwebtoken');

let tokenValidation = (req, res, next) => {
    let token = req.headers.token;

    console.log(token);
    
    next();
}

module.exports = tokenValidation;