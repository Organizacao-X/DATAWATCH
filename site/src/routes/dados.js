var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");

router.get("/ultimas/:idMaquina", function (req, res) {
    dadosController.buscarUltimasdados(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    dadosController.buscarDadosEmTempoReal(req, res);
})

router.get("/cadastrarDados/:idMaquina", function (req, res) {
    dadosController.cadastrarDados(req, res);
})

module.exports = router;