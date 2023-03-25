/* ============================================= DATAWATCH =================================================== */

var datawatchModel = require("../models/datawatchModel");

// CADASTRO SIMPLES
function cadastrar(req, res) {
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
        res.status(400).send("Seu CPF está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo datawatchModel.js
        datawatchModel.cadastrar(nome, email, cpf, senha)
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

// CADASTRO DE MAQUINA
function cadastrarMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkEmpresa = req.body.fkEmpresaServer;
    var nome = req.body.nomeServer;
    var serie = req.body.serieServer;
    var data = req.body.dataServer;
    var especificacao = req.body.especificacaoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (serie == undefined) {
        res.status(400).send("Sua série está undefined!");
    } else if (data == undefined) {
        res.status(400).send("Sua data está undefined!");
    } else if (especificacao == undefined) {
        res.status(400).send("sua especificação está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo datawatchModel.js
        datawatchModel.cadastrarMaquina(fkEmpresa, nome, serie, data, especificacao)
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

function cadastrarEmpresa1(req, res) {
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var rua_av = req.body.rua_avServer;
    var numero = req.body.numeroServer;
    var bairro = req.body.bairroServer;
    var complemento = req.body.complementoServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    if (razaoSocial == undefined) {
        res.status(400).send("Seu ramoAtividade está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (rua_av == undefined) {
        res.status(400).send("Sua rua_av está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        datawatchModel.cadastrarEmpresa1(razaoSocial, cnpj, cep, rua_av, numero, complemento, bairro, cidade, estado).then(
            function (resultado) {
                res.json(resultado);
            }
            ).catch(
                function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro de empresa! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}
function cadastrarEmpresa2(req, res) {
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var idusuario = req.body.fkIdServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else {
        
        datawatchModel.cadastrarEmpresa2(email, telefone, idusuario).then(
            function (resultado) {
                res.json(resultado);
            }
            ).catch(
                function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro de empresa! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function cadastrarEmpresa3(req, res) {
    var idusuario = req.body.fkIdServer;

    if (idusuario == undefined) {
        res.status(400).send(`Nao ta puxando o ID`)
    } else {

        datawatchModel.cadastrarEmpresa3(idusuario).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro de empresa! Erro: ", erro.sqlMessage);
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
        var adm = req.body.admServer;
        var fkEmpresa = req.body.fkEmpresaServer

        // Faça as validações dos valores
        if (nome == undefined) {
            res.status(400).send("Seu nome está undefined!");
        } else if (email == undefined) {
            res.status(400).send("Seu email está undefined!");
        } else if (cpf == undefined) {
            res.status(400).send("Seu cpf está undefined!");
        } else if (senha == undefined) {
            res.status(400).send("Sua senha está undefined!");
        } else if (adm == undefined) {
            res.status(400).send("Funcionário não vinculado a um gerente(undefined)");
        } else if (fkEmpresa == undefined) {
            res.status(400).send("Funcionário não vinculado a uma empresa   (undefined)");
        } else {

            // Passe os valores como parâmetro e vá para o arquivo datawatchModel.js
            datawatchModel.cadastrarFuncionario(nome, email, cpf, senha, adm, fkEmpresa)
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

    function entrar(req, res) {
        var email = req.body.emailServer;
        var senha = req.body.senhaServer;
    
        if (email == undefined) {
            res.status(400).send("Seu email está undefined!");
        } else if (senha == undefined) {
            res.status(400).send("Sua senha está indefinida!");
        } else {
            
            datawatchModel.entrar(email, senha)
                .then(
                    function (resultado) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
    
                        if (resultado.length == 1) {
                            console.log(resultado);
                            res.json(resultado[0]);
                        } else if (resultado.length == 0) {
                            res.status(403).send("Email e/ou senha inválido(s)");
                        } else {
                            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                        }
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                        res.status(500).json(erro.sqlMessage);
                    }
                );
        }
    
    }

    module.exports = {
        entrar,
        cadastrar,
        cadastrarFuncionario,
        cadastrarMaquina,
        cadastrarEmpresa1,
        cadastrarEmpresa2,
        cadastrarEmpresa3
    }