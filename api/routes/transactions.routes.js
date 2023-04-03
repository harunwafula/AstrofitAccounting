const controller = require("../controllers/transaction.controller");


module.exports = (app) => {
    app.post('/api/addTransaction', controller.addTransaction);
    app.get("/api/getTransactions", controller.getTransactions, );
}