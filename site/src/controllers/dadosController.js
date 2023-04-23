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

function cadastrarMetricas(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cpu = req.body.cpuMetricaServer;
    var ram = req.body.ramMetricaServer;
    var disco = req.body.discoMetricaServer;

    // Faça as validações dos valores
    if (ram == undefined) {
        res.status(400).send("Seu ram está undefined!");
    } else if (cpu == undefined) {
        res.status(400).send("Seu cpu está undefined!");
    } else if (disco == undefined) {
        res.status(400).send("Sua disco está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarDados(cpu, ram, disco, idMaquina)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarDadosEmTempoReal(req, res) {

    var idMaquina = req.params.idMaquina;
    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando Dados em tempo real`);

    dadosModel.buscarDadosEmTempoReal(idMaquina, idEmpresa).then(function (resultado) {
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
    buscarDadosEmTempoReal,
    cadastrarMetricas

}