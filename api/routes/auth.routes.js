
const { verifyRegister } = require("../middlewears");
const controller = require("../controllers/auth.controller");
module.exports = (app) => {
    app.post("/api/register", [verifyRegister.checkDuplicateEmail],controller.register);
    app.post("/api/login", controller.login);

}