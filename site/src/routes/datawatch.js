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
router.post("/cadastrarEmpresa1", function (req, res) {
    datawatchController.cadastrarEmpresa1(req, res);
})

//Recebendo os dados do html cadastroEmpresa
router.post("/cadastrarEmpresa2", function (req, res) {
    datawatchController.cadastrarEmpresa2(req, res);
})

//Recebendo os dados do html cadastroEmpresa
router.post("/cadastrarEmpresa3", function (req, res) {
    datawatchController.cadastrarEmpresa3(req, res);
})

// Recebendo os dados do html cadastroMaquina
router.post("/cadastrarMaquina", function (req, res) {
    datawatchController.cadastrarMaquina(req, res);
})

router.post("/autenticar", function (req, res) {
    datawatchController.entrar(req, res);
});

router.post("/consultarStatusEmpresa", function (req, res) {
    datawatchController.consultarStatusEmpresa(req, res);
});

router.post("/pegarMaquinas", function (req, res) {
    datawatchController.pegarMaquinas(req, res);
})

router.post("/pegarFuncionarios", function (req, res) {
    datawatchController.pegarFuncionarios(req, res);
})

router.get("/pegarTempoAtivMaquinas/:idEmpresa", function (req, res) {
    datawatchController.pegarTempoAtivMaquinas(req, res);
})

router.get("/pegarDadosGrafico/:idEmpresa", function (req, res) {
    datawatchController.pegarDadosGrafico(req, res)
})

module.exports = router;