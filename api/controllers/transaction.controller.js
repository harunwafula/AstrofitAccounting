const db = require("../models/index");

const Transaction = db.transaction;


exports.addTransaction =  (req, res) => {
    const transaction = new Transaction({
        date : req.body.date,
        amount : req.body.amount,
        details : req.body.details,
        account : req.body.account,
        fulfiller : req.body.fulfiller,
        organization : req.body.organization,
        type : req.body.type

    });

    transaction.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({message : err});
    });
    
    
    
}


exports.getTransactions = async (req, res) => {
    Transaction.find({}).then((transactions) => {
        res.send(transactions);
    }).catch((error) => {
        res.status(500).send({error : error})
    });
   
}

