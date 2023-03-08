/* ============================================= DATAWATCH =================================================== */

var express = require("express");
var router = express.Router();

var datawatchController = require("../controllers/datawatchController");

//Recebendo os dados do html cadastro
router.post("/cadastrar", function (req, res) {
    datawatchController.cadastrar(req, res);
})

//Recebendo os dados do html cadastroFuncionario
router.post("/cadastrarFuncionario", function (req, res) {
    datawatchController.cadastrarFuncionario(req, res);
})

//Recebendo os dados do html cadastroEmpresa
router.post("/cadastrarEmpresa", function (req, res) {
    datawatchController.cadastrarEmpresa(req, res);
})

// Recebendo os dados do html cadastroMaquina
router.post("/cadastrarMaquina", function (req, res) {
    datawatchController.cadastrarMaquina(req, res);
})

module.exports = router;