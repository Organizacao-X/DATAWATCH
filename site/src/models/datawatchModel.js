/* ============================================= DATAWATCH =================================================== */

var database = require("../database/config");
// CADASTRO INICIAL
function cadastrar(nome, email, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuarios (nomeUsuario, email, cpf, senha, adm, fkEmpresa) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', null, null);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE EMPRESAS
function cadastrarEmpresa1(razaoSocial, cnpj, cep, rua_av, numero, complemento, bairro, cidade, estado) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa1():", razaoSocial, cnpj, cep, rua_av, numero, complemento, bairro, cidade, estado);
    var instrucao = `
        INSERT INTO Empresas (razaoSocial, cnpj, cep, logradouro, numero, complemento, bairro, cidade, estado, verificado) VALUES ('${razaoSocial}','${cnpj}', '${cep}', '${rua_av}', ${numero}, '${complemento}','${bairro}', '${cidade}','${estado}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE EMPRESAS
function cadastrarEmpresa2(email, telefone, idusuario) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa2():", email, telefone, idusuario);
    var instrucao = `
        INSERT INTO Contato (fkEmpresa, email, telefone) VALUES ('${idusuario}', '${email}', '${telefone}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE EMPRESAS
function cadastrarEmpresa3(idempresa, idusuario) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa3():", idusuario);
    var instrucao = `
        UPDATE Usuarios set FkEmpresa = ${idempresa} where idUsuario = ${idusuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE FUNCIONARIOS
function cadastrarFuncionario(nome, email, cpf, senha, adm, FkEmpresa) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFuncionario():", nome, email, cpf, senha, adm);
    var instrucao = `
        INSERT INTO Usuarios (nomeUsuario, email, cpf, senha, adm, fkEmpresa) VALUES ('${nome}', '${email}','${cpf}', '${senha}', ${adm}, ${FkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE MAQUINAS
function cadastrarMaquina(fkEmpresa, nome, serie, data,) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():",fkEmpresa, nome, serie, data);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Maquinas (fkEmpresa, nomeMaquina, serie, dtChegada,statusSistema) VALUES
        (${FkEmpresa},'${nome}', '${serie}','${data}',0);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CONSULTANDO SE EMPRESA ESTÁ VERIFICADA
function consultarStatusEmpresa(idUsuario) {
    var instrucao = `SELECT Usuarios.idUsuario,
                            Usuarios.nomeUsuario,
                            Usuarios.adm,
                            Usuarios.fkEmpresa,
                            Empresas.verificado
                     FROM Usuarios
                     JOIN Empresas
                     ON Usuarios.fkEmpresa = Empresas.idEmpresa
                     WHERE Usuarios.idUsuario = ${idUsuario};`

    return database.executar(instrucao);
}

function pegarMaquinas(idEmpresa) {
    var instrucao = `SELECT maquinas.idMaquina Id, maquinas.nomeMaquina, maquinas.statusSistema,
	SEC_TO_TIME(maquinas.tempoAtividade) AS tempo_total,
       CONCAT(FLOOR(maquinas.tempoAtividade / 86400), ' dias, ',
              SEC_TO_TIME(maquinas.tempoAtividade % 86400)) AS tempo_formatado,
              COUNT(Possuem.idPosse) AS contagemChamados
              FROM Maquinas
              LEFT JOIN Possuem
              ON maquinas.idmaquina = Possuem.fkmaquina
              where maquinas.fkempresa = ${idEmpresa}
              group by maquinas.idmaquina;`

    return database.executar(instrucao);
}

function pegarFuncionarios(idEmpresa) {
    var instrucao = `SELECT * FROM Usuarios WHERE fkEmpresa = ${idEmpresa} AND adm IS NOT NULL;`

    return database.executar(instrucao);
}

function pegarDadosGrafico(idEmpresa) {
    var instrucao = `SELECT 
    nomeMaquina,
    fkmaquina as Maquina, Sum(ramuso) as somaRam, 
    TIME_FORMAT(dataHora, '%H : 00') AS HoraFormata 
    from Capturas 
    JOIN Maquinas
        ON Maquinas.idMaquina = Capturas.fkMaquina
    where dataHora >= SUBDATE(CURDATE(), INTERVAL 30 DAY) 
    and Capturas.fkempresa = ${idEmpresa} 
    group by nomeMaquina, fkmaquina, HoraFormata
    order by HoraFormata, fkMaquina;`

    return database.executar(instrucao)
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarFuncionario,
    cadastrarMaquina,
    cadastrarEmpresa1,
    cadastrarEmpresa2,
    cadastrarEmpresa3,
    consultarStatusEmpresa,
    pegarMaquinas,
    pegarFuncionarios,
    pegarDadosGrafico
};