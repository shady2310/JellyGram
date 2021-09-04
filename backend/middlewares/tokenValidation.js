const jwt = require('jsonwebtoken');

let tokenValidation = (req, res, next) => {
    let token = req.headers.token;

    if(!token) {
        return res.json({
            success: false,
            message: "Token not provided"
        })
    }
    
    jwt.verify(token, process.env.TOKEN_WORD, (error, decoded) => {
        if(error) {
            return res.json({
                success: false,
                message: "Token not valid"
            })
        }else{
            req.body.userId = decoded.id;
            next();
        }
    })
    
}

module.exports = tokenValidation;