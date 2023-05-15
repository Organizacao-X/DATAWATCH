/* ============================================= DATAWATCH =================================================== */

var database = require("../database/config");
// CADASTRO INICIAL
function cadastrar(nome, email, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuarios (nomeUsuario, email, cpf, senha, adm, fkEmpresa, uuid) VALUES ('${nome}', '${email}', '${cpf}', 
        CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', CONCAT('${senha}', '${senha}')),2), null, null, NEWID());
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE EMPRESAS
function cadastrarEmpresa1(razaoSocial, cnpj, cep, rua_av, numero, complemento, bairro, cidade, estado, filial) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa1():", razaoSocial, cnpj, cep, rua_av, numero, complemento, bairro, cidade, estado,filial);
    var instrucao = `
        INSERT INTO Empresas (razaoSocial, cnpj, cep, logradouro, numero, complemento, bairro, cidade, estado, verificado, filial) VALUES ('${razaoSocial}','${cnpj}', '${cep}', '${rua_av}', ${numero}, '${complemento}','${bairro}', '${cidade}','${estado}', 1, '${filial}');
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
        INSERT INTO Usuarios (nomeUsuario, email, cpf, senha, adm, fkEmpresa, uuid) VALUES ('${nome}', '${email}','${cpf}',
        CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', CONCAT('${senha}', '${senha}')),2), ${adm}, ${FkEmpresa}, NEWID());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE Maquinas
function cadastrarMaquina(fkEmpresa, nome, serie, data,) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", fkEmpresa, nome, serie, data);

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
        SELECT * FROM Usuarios WHERE email = '${email}' AND senha = CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', CONCAT('${senha}', '${senha}')),2);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticarDiretor(uuid) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", uuid)

    var instrucao = `
    SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS existe_registro 
    FROM [dbo].[Diretores] 
    WHERE uuid = '${uuid}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CONSULTANDO SE EMPRESA ESTÁ VERIFICADA
function consultarStatusEmpresa(idUsuario) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT Usuarios.idUsuario,
                     Usuarios.nomeUsuario,
                     Usuarios.adm,
                     Usuarios.fkEmpresa,
                     Empresas.verificado
              FROM Usuarios
              JOIN Empresas
              ON Usuarios.fkEmpresa = Empresas.idEmpresa
              WHERE Usuarios.idUsuario = ${idUsuario};`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Usuarios.idUsuario,
                            Usuarios.nomeUsuario,
                            Usuarios.adm,
                            Usuarios.fkEmpresa,
                            Empresas.verificado
                     FROM Usuarios
                     JOIN Empresas
                     ON Usuarios.fkEmpresa = Empresas.idEmpresa
                     WHERE Usuarios.idUsuario = ${idUsuario};`
    }




    return database.executar(instrucao);
}

function pegarMaquinas(idEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        var instrucao = `SELECT Maquinas.idMaquina Id, Maquinas.nomeMaquina, Maquinas.statusSistema,
    CONVERT(VARCHAR(8), DATEADD(SECOND, Maquinas.tempoAtividade, 0), 108) AS tempo_total,
    (Maquinas.tempoAtividade * 1000) AS tempo_total_milissegundos,
    CONCAT(FLOOR(Maquinas.tempoAtividade / 86400), ' dias, ',
    CONVERT(VARCHAR(8), DATEADD(SECOND, Maquinas.tempoAtividade % 86400, 0), 108)) AS tempo_formatado,
    COUNT(Possuem.fkmaquina) AS contagemChamados,
    SUM(Possuem.PesoAlertas) AS PesoAlerta
    FROM Maquinas
    LEFT JOIN Possuem ON Maquinas.idmaquina = Possuem.fkmaquina
    WHERE Maquinas.fkempresa = ${idEmpresa}
    GROUP BY idmaquina, Maquinas.nomeMaquina, Maquinas.statusSistema, Maquinas.tempoAtividade;`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `SELECT Maquinas.idMaquina Id, Maquinas.nomeMaquina, Maquinas.statusSistema,
	SEC_TO_TIME(Maquinas.tempoAtividade) AS tempo_total,
    (tempoAtividade * 1000) AS tempo_total_milissegundos,
       CONCAT(FLOOR(Maquinas.tempoAtividade / 86400), ' dias, ',
              SEC_TO_TIME(Maquinas.tempoAtividade % 86400)) AS tempo_formatado,
              count(Possuem.fkmaquina) AS contagemChamados
              FROM Maquinas
              LEFT JOIN Possuem
              ON Maquinas.idmaquina = Possuem.fkmaquina
              where Maquinas.fkempresa = ${idEmpresa}
              group by idmaquina;`
    }

    return database.executar(instrucao);
}

function pegarFuncionarios(idEmpresa) {
    var instrucao = `SELECT * FROM Usuarios WHERE fkEmpresa = ${idEmpresa} AND adm IS NOT NULL;`

    return database.executar(instrucao);
}

function pegarDadosGrafico(idEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        var instrucao = `SELECT 
        Maquinas.nomeMaquina, 
        Capturas.fkmaquina AS Maquina, 
        SUM(Capturas.ramuso) AS somaRam, 
        FORMAT(Capturas.dataHora, 'HH : 00') AS HoraFormata 
        FROM Capturas 
        JOIN Maquinas 
        ON Maquinas.idMaquina = Capturas.fkMaquina 
        WHERE Capturas.dataHora <= DATEADD(DAY, -30, GETDATE()) 
        AND Capturas.fkempresa = ${idEmpresa} 
        GROUP BY Maquinas.nomeMaquina, Capturas.fkmaquina, FORMAT(Capturas.dataHora, 'HH : 00') 
        ORDER BY HoraFormata, Maquina;`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

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
    }


    return database.executar(instrucao)
}

function editarFuncionario(idFunc, email, senha) {
    var instrucao = `UPDATE Usuarios SET email = '${email}', senha = '${senha}' WHERE idUsuario = ${idFunc}`

    return database.executar(instrucao)
}

function vincularDiretor(idUsuario, idEmpresa, uuid) {
    var instrucao = `INSERT INTO Diretores VALUES
     (${idUsuario},${idEmpresa},'${uuid}')`

    return database.executar(instrucao)
}

function lancarMetricas(cpu, ram, disco, idMaquina) {

    if (cpu == undefined) {
        cpu = null
    }

    var instrucao = `UPDATE Maquinas SET cpuMetrica = ${cpu}, ramMetrica = ${ram}, gatilhoDisco1 = ${disco} WHERE idMaquina = ${idMaquina}`

    console.log(instrucao);
    return database.executar(instrucao)
}

function registrarAlertas(idMaquina, idEmpresa, tipoAlerta, pesoAlerta) {
    var instrucao = `Insert INTO Possuem (fkAlerta, fkMaquina, fkEmpresa, dataHora, pesoAlertas) VALUES
    (${tipoAlerta}, ${idMaquina}, ${idEmpresa}, CONVERT (DATETIME, CURRENT_TIMESTAMP), ${pesoAlerta});`

    console.log(instrucao);
    return database.executar(instrucao)
}

function desativarFuncionario(idFunc) {
    var instrucao = `DELETE FROM Usuarios WHERE idUsuario = ${idFunc}`

    return database.executar(instrucao)
}

function exibirBoasVindas(idUsuario) {
    var instrucao = `SELECT * FROM Usuarios WHERE idUsuario = ${idUsuario};`

    return database.executar(instrucao);
}

function pegarDadosDiretor(idUsuario) {
    var instrucao = `SELECT
    Maquinas.fkEmpresa,
    Empresas.razaoSocial,
    SUM(Maquinas.statusSistema) AS 'maquinasAtivas',
    COUNT(Maquinas.statusSistema) AS 'qtdMaquinas'
    FROM [dbo].[Maquinas]
    JOIN [dbo].[Empresas] ON Maquinas.fkEmpresa = Empresas.idEmpresa
    WHERE fkEmpresa = ${idUsuario} GROUP BY fkEmpresa, razaoSocial;`

    return database.executar(instrucao);
}

// function validarDiretor(idUsuario) {

// }

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
    pegarDadosGrafico,
    editarFuncionario,
    desativarFuncionario,
    exibirBoasVindas,
    lancarMetricas,
    registrarAlertas,
    // validarDiretor,
    pegarDadosDiretor,
    vincularDiretor
};