/* ============================================= DATAWATCH =================================================== */

var datawatchModel = require("../models/datawatchModel");

// CADASTRO DE MAQUINA
function cadastrarMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var serie = req.body.serieServer;
    var data = req.body.dataServer;
    var especificacao = req.body.especificacaoServer;
    var setor = req.body.setorServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (serie == undefined) {
        res.status(400).send("Sua série está undefined!");
    } else if (data == undefined) {
        res.status(400).send("Sua data está undefined!");
    } else if (especificacao == undefined){
        res.status(400).send("sua especificação está undefined!");
    } else if (setor == undefined){
        res.status(400).send("seu setor está undefined!");
    } else {   
        
        // Passe os valores como parâmetro e vá para o arquivo datawatchModel.js
        datawatchModel.cadastrarMaquina(nome, serie, data, especificacao, setor)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro de máquina! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

/* CADASTRO DE FUNCIONARIO */
function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!"); 
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo datawatchModel.js
        datawatchModel.cadastrarFuncionario(nome, email, cpf, senha)
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

module.exports = {
    cadastrarFuncionario,
    cadastrarMaquina
}