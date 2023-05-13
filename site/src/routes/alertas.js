var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");


router.get("/exibiralertas/:idmaquina", function (req, res) {
    alertasController.exibiralertas(req, res);
})


module.exports = router;

