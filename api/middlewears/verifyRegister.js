const db = require("../models")
const User = db.user;


checkDuplicateEmail = (req, res, next) => {
     User.findOne({
        email: req.body.email
      }).exec().then((result) => {
        if (result != null) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
          }

          next();
      }).catch ((err) =>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
      });
}

module.exports = {checkDuplicateEmail};