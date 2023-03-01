/* ============================================= DATAWATCH =================================================== */

var express = require("express");
var router = express.Router();

var datawatchController = require("../controllers/datawatchController");

//Recebendo os dados do html cadastroFuncionario
router.post("/cadastrarFuncionario", function (req, res) {
    datawatchController.cadastrarFuncionario(req, res);
})

// Recebendo os dados do html cadastroMaquina
router.post("/cadastrarMaquina", function (req, res) {
    datawatchController.cadastrarMaquina(req, res);
})

module.exports = router;