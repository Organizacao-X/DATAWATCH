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
                    res.status(500).json(erro.message);
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

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (serie == undefined) {
        res.status(400).send("Sua série está undefined!");
    } else if (data == undefined) {
        res.status(400).send("Sua data está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo datawatchModel.js
        datawatchModel.cadastrarMaquina(fkEmpresa, nome, serie, data)
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


    console.log(req.body)
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
    var idempresa = req.body.fkIdServer;
    var idusuario = req.body.idUsuarioServer;

    if (idempresa == undefined) {
        res.status(400).send(`Nao ta puxando o ID`)
    } else {

        datawatchModel.cadastrarEmpresa3(idempresa, idusuario).then(
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

function autenticarDiretor(req, res) {
    var uuid = req.body.uuidServer;

    if (uuid == undefined) {
        res.status(400).send("Seu uuid está undefined!");
    } else {
        datawatchModel.autenticarDiretor(uuid)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                        console.log(resultado);
                        res.json(resultado[0]);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a validação! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// CONSULTANDO SE EMPRESA ESTÁ VERIFICADA
function consultarStatusEmpresa(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu ID de usuário está undefined!");
    } else {
        datawatchModel.consultarStatusEmpresa(idUsuario)
            .then(
                function (resultado) {
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
                    if (resultado.length == 1 || resultado.length == 0) {
                        console.log(resultado);
                        res.json(resultado);
                    } else {
                        res.status(403).send("Usuário com mais de uma empresa cadastrada!");
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

// PEGANDO AS MÁQUINAS DA EMRPESA X
function pegarMaquinas(req, res) {
    var idEmpresa = req.body.idEmpresaServer;

    if (idEmpresa == undefined) {
        res.status(400).send("Sua idEmpresa está undefined");
    } else {
        datawatchModel.pegarMaquinas(idEmpresa)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);

                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.json(resultado);
                    } else if (resultado.length == 0) {
                        console.log("Nenhuma máquina cadastrada nesta empresa")
                        res.status(403).send("Nenhuma máquina cadastrada");
                    } else {
                        res.status(403).send("Erro");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao puxar as máquinas cadastradas! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function pegarFuncionarios(req, res) {
    var idEmpresa = req.body.idEmpresaServer;

    if (idEmpresa == undefined) {
        res.status(400).send("Sua idEmpresa está undefined");
    } else {
        datawatchModel.pegarFuncionarios(idEmpresa)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);

                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.json(resultado);
                    } else if (resultado.length == 0) {
                        console.log("Nenhum funcionário cadastrado nesta empresa")
                        res.status(403).send("Nenhum funcionário cadastrado");
                    } else {
                        res.status(403).send("Erro");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao puxar os funcionários cadastrados! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function pegarTempoAtivMaquinas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined")
    } else {
        datawatchModel.pegarTempoAtivMaquinas(idEmpresa).then(function (resultado) {
            console.log(`Maquinas e tempo de atv encontrado: ${resultado}`)
            res.json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            console.log("Houve um erro ao pegar as máquinas e seu tempo de atividade! Erro : ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
    }

}

function pegarDadosGrafico(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined")
    } else {
        datawatchModel.pegarDadosGrafico(idEmpresa).then(function (resultado) {
            console.log(`Dados de máquina encontrados: ${resultado}`)
            res.json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            console.log("Houve um erro ao pegar os dados das máquinas! Erro: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

// EDITAR DADOS DE UM FUNCIONÁRIO JÁ REGISTRADO
function editarFuncionario(req, res) {
    var idFunc = req.params.idFuncionario;
    var email = req.body.novoEmailServer;
    var senha = req.body.novaSenhaServer;

    if (idFunc == undefined) {
        res.status(400).send("Seu idFunc está undefined");
    } else {
        datawatchModel.editarFuncionario(idFunc, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao editar o funcionário! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
// VICULAR O CÓDIGO PRA TER DIRETOR
function vincularDiretor(req, res) {
    var idEmpresa = req.body.idEmpresa;
    var uuid = req.body.uuid;
    var idUsuario = req.params.idUsuario;

    if (idEmpresa == undefined) {
        res.status(400).send("A empresa está indefinido!");
    } else if (uuid == undefined) {
        res.status(400).send("O uuid está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        datawatchModel.vincularDiretor(idUsuario, idEmpresa, uuid)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// DELETAR FUNCIONARIO JA CADASTRADO
function desativarFuncionario(req, res) {
    var idFunc = req.params.idFuncionario;
    if (idFunc == undefined) {
        res.status(400).sends("Seu idFunc está undefined")
    } else {
        datawatchModel.desativarFuncionario(idFunc)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro)
                    console.log("\nHouve um erro ao deletar o funcionario! Erro: ", erro.sqlMessage)
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function exibirBoasVindas(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu usuário está undefined")
    } else {
        datawatchModel.exibirBoasVindas(idUsuario).then(function (resultado) {
            console.log(`Dados de usuário encontrados: ${resultado}`)
            res.json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            console.log("Houve um erro ao pegar os dados do usuário! Erro: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function lancarMetricas(req, res) {
    var cpu = req.body.cpuMetricaServer;
    var ram = req.body.ramMetricaServer;
    var disco = req.body.discoMetricaServer;
    var idMaquina = req.body.idMaquinaServer;

    if (idMaquina == undefined) {
        res.status(400).send("");
    } else {
        console.log(cpu, ram, disco, idMaquina)
        datawatchModel.lancarMetricas(cpu, ram, disco, idMaquina)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao adicionar as métricas! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function registrarAlertas(req, res) {
    var idMaquina = req.body.idMaquinaServer;
    var idEmpresa = req.body.idEmpresaServer;
    var tipoAlerta = req.body.tipoAlertaServer;
    var pesoAlerta = req.body.Server;

    if (idMaquina == undefined) {
        res.status(400).send("");
    } else {
        console.log(idMaquina, idEmpresa, tipoAlerta, pesoAlerta)
        datawatchModel.registrarAlertas(idMaquina, idEmpresa, tipoAlerta, pesoAlerta)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao registar os alertas! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    autenticarDiretor,
    cadastrar,
    cadastrarFuncionario,
    cadastrarMaquina,
    cadastrarEmpresa1,
    cadastrarEmpresa2,
    cadastrarEmpresa3,
    consultarStatusEmpresa,
    pegarMaquinas,
    pegarFuncionarios,
    pegarTempoAtivMaquinas,
    pegarDadosGrafico,
    editarFuncionario,
    desativarFuncionario,
    exibirBoasVindas,
    lancarMetricas,
    registrarAlertas,
    vincularDiretor
}