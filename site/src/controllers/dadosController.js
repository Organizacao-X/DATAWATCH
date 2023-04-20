var dadosModel = require("../models/dadosModel");

function buscarUltimasDados(req, res) {

    const limite_linhas = 10;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dadosModel.buscarUltimasDados(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos dados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function buscarDadosEmTempoReal(req, res) {

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando Dados em tempo real. ID MAQUINA: ${idMaquina}`);

    dadosModel.buscarDadosEmTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos dados", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasDados,
    buscarDadosEmTempoReal

}