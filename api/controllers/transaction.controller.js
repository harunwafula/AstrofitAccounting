const db = require("../models/index");

const Transaction = db.transaction;


exports.addTransaction = async (req, res) => {
    const transaction = new Transaction({
        date : req.body.date,
        amount : req.body.amount,
        details : req.body.details,
        account : req.body.account,
        fulfiller : req.body.fulfiller,
        subsidiary : req.body.subsidiary,
        type : req.body.type

    });

    const result =  await transaction.save();
    
    if(result === null) {
        res.status(500).send({message : err});
        return;
    }
    res.send({outcome : "was a success"});
    
}

