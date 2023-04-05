const db = require("../models");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

exports.register = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : password
    });

    user.save().then((user) => {
        const token = jwt.sign({id : user._id}, config.key01 , {
            expiresIn : 86400 //24hr
        });
        res.send(
            {
                username : user.username,
                email : user.email,
                id : user._id,

                token : token
            }
        );
    }).catch((error) => {
        res.status(500).send(error);
    });

   



}

exports.login = async (req, res) => {
   const user = await User.findOne({email : req.body.email}).exec();
   if(user == null) {
        return res.status(404).send("User does not exist");
   }
   const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
   if(passwordIsValid){
        const token = jwt.sign({id:user._id}, config.key01, {
            expiresIn : 86400//24hrs in seconds
        });
        return res.send({
            username : user.username,
            email : user.email,
            id : user._id,
            token : token
        });
   }else {
       res.send({error : "Invalid Password"});
   }



}