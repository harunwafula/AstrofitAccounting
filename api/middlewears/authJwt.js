const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config")

verifyToken = (req, res, next) => {
    let token = req.header["x-access-token"];
    if(!token) {
        return res.status(500).send({error : "No token provided !"});
    }
    jwt.verify(token, config.key01,(err, decoded)=>{
        if(err) {
            return res.status(401).send({error : "Unauthorized!"});
        }
        req.userId = decoded.id;
        next();
    });

}

module.exports = {verifyToken};
