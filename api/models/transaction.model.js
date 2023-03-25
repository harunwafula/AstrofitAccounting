const mongoose = require("mongoose");
const Transaction = mongoose.model(
    "Transaction",
    new mongoose.Schema(
        {
            "date": String,
            "amount" : String,
            "details" : String,
            "account" : String,
            "fulfiller" : String,
            "subsidiary" : String,
            "type" : String
        }
    )
)

module.exports = Transaction;
