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
function cadastrarEmpresa1(razaoSocial, cnpj, cep, rua_av, numero, complemento, bairro, cidade, estado) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa1():", razaoSocial, cnpj, cep, rua_av, numero, complemento, bairro, cidade, estado);
    var instrucao = `
        INSERT INTO Empresas (razaoSocial, cnpj, cep, logradouro, numero, complemento, bairro, cidade, estado, verificado) VALUES 
        ('${razaoSocial}','${cnpj}', '${cep}', '${rua_av}', ${numero}, '${complemento}','${bairro}', '${cidade}','${estado}', 0);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// CADASTRO DE EMPRESAS
function recuperarEmpresa(idUsuario) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function recuperarEMpresa():", idUsuario);
    var instrucao = `
    SELECT TOP 1 *
    FROM Empresas
    ORDER BY idEmpresa DESC;
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE EMPRESAS
function cadastrarEmpresa2(idEmpresa, email, telefone) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa2():", email, telefone, idEmpresa);
    var instrucao = `
        INSERT INTO Contato (fkEmpresa, email, telefone) VALUES (${idEmpresa}, '${email}', '${telefone}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// CADASTRO DE EMPRESAS
function cadastrarEmpresa3(idEmpresa, idUsuario) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa3():", idUsuario);
    var instrucao = `
        UPDATE Usuarios set fkEmpresa = ${idEmpresa} where idUsuario = ${idUsuario};
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

function atualizarStatusMaquinas(idEmpresa) {
    var instrucao = 
                   `SELECT COALESCE(DATEDIFF(SECOND, MAX(c.dataHora), DATEADD(HOUR, -3, GETDATE())), 99999999) AS segundos_desde_lastinsert, m.nomeMaquina
                   FROM Capturas c
                   RIGHT JOIN Maquinas m ON m.idMaquina = c.fkMaquina
                   WHERE m.fkEmpresa = ${idEmpresa}
                   GROUP BY m.nomeMaquina
                   ORDER BY segundos_desde_lastinsert DESC;`;

    return database.executar(instrucao)
}

function pegarMaquinas(idEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        var instrucao = `SELECT Maquinas.idMaquina Id, Maquinas.nomeMaquina, Maquinas.statusSistema,
        CONVERT(VARCHAR(8), DATEADD(SECOND, Maquinas.tempoAtividade, 0), 108) AS tempo_total,
        (Maquinas.tempoAtividade * 1000) AS tempo_total_milissegundos,
        Maquinas.sistemaOperacional as sistemaOperacional,
        CONCAT(FLOOR(Maquinas.tempoAtividade / 86400), ' dias, ',
        CONVERT(VARCHAR(8), DATEADD(SECOND, Maquinas.tempoAtividade % 86400, 0), 108)) AS tempo_formatado,
        COUNT(Log.fkmaquina) AS contagemChamados,
        SUM(Alertas.peso) AS PesoAlerta,
		MAX(cap.dataHora) as dataHora
        FROM Maquinas
        LEFT JOIN [dbo].[Log] ON Maquinas.idmaquina = Log.fkmaquina
		LEFT join Alertas 
		on Log.fkAlerta = Alertas.idAlerta
		LEFT JOIN [dbo].[Capturas] AS cap ON Maquinas.idMaquina = cap.fkMaquina
        WHERE Maquinas.fkempresa = ${idEmpresa}
        GROUP BY idmaquina, Maquinas.nomeMaquina, Maquinas.statusSistema, Maquinas.tempoAtividade, Maquinas.sistemaOperacional;`

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
    var instrucao = `
                    SELECT 
                        u.*,
                        IIF(d.fkEmpresa IS NULL, 0, 1) isDiretor
                    FROM Usuarios u
                    LEFT JOIN Diretores d
                    ON d.fkUsuario = u.idUsuario
                    WHERE u.fkEmpresa = ${idEmpresa}
                    AND u.adm IS NOT NULL;`

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

function pegarFiliais(uuid) {
    var instrucao = `
    SELECT
    usu.nomeUsuario AS 'administrador',
    usu.email,
    emp.razaoSocial,
    emp.logradouro,
    emp.numero,
    emp.bairro,
    emp.cidade,
    emp.estado,
    emp.cep,
    COALESCE(SUM(maq.statusSistema), 0) AS 'maquinasAtivas',
    COALESCE(COUNT(maq.statusSistema), 0) AS 'qtdMaquinas',
    COALESCE((COUNT(maq.statusSistema) - SUM(maq.statusSistema)), 0) AS maquinasInativas,
    COALESCE(logs.qtdLogs, 0) AS qtdLogs,    
    COALESCE(logs.somaPeso, 0) AS somaPeso
FROM [dbo].[Empresas] AS emp
JOIN [dbo].[Usuarios] AS usu
    ON usu.fkEmpresa = emp.idEmpresa
LEFT JOIN [dbo].[Diretores] AS dir
    ON emp.idEmpresa = dir.fkEmpresa
LEFT JOIN [dbo].[Maquinas] AS maq
    ON maq.fkEmpresa = emp.idEmpresa
LEFT JOIN
(
    SELECT
        fkEmpresa,
        COUNT(dataHora) AS qtdLogs,
        SUM(peso) AS somaPeso
    FROM [dbo].[Log]
    JOIN [dbo].[Alertas]
        ON [dbo].[Log].fkAlerta = [dbo].[Alertas].idAlerta
    WHERE [dbo].[Log].dataHora >= DATEADD(DAY, -30, GETDATE())
    GROUP BY fkEmpresa
) AS logs
    ON logs.fkEmpresa = emp.idEmpresa
WHERE usu.adm IS NULL AND dir.uuid = '${uuid}'
GROUP BY
    usu.nomeUsuario,
    usu.email,
    emp.razaoSocial,
    emp.logradouro,
    emp.numero,
    emp.bairro,
    emp.cidade,
    emp.estado,
    emp.cep,
    logs.qtdLogs,
    logs.somaPeso;`

    return database.executar(instrucao);
}

function pegarAlertas(idMaquina) {
    var instrucao = `SELECT * FROM Alertas a
    JOIN Log l
       ON l.fkAlerta = a.idAlerta
       AND l.fkMaquina = ${idMaquina};`

    return database.executar(instrucao);
}

function rebootar(fkMaquina, fkEmpresa) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", fkMaquina, fkEmpresa);
    var instrucao = `
        UPDATE Reboot SET rebootar = 1 WHERE fkMaquina = ${fkMaquina} AND fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validarReboot(fkMaquina, fkEmpresa) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", fkMaquina, fkEmpresa);

    var instrucao = `SELECT rebootar FROM Reboot WHERE fkMaquina = ${fkMaquina} AND fkEmpresa = ${fkEmpresa}`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function pegarDadosGraficoEmpilhado(fkEmpresa) {
    console.log("Acessei PEGAR DADOS GRÁFICO EMPILHADO");

    var instrucao = `
SELECT 
    m.nomeMaquina AS nomeMaquina, 
    COALESCE(SUM(c.ramUso), 0) AS ramUso, 
    dh.dataHora1
FROM (
    SELECT DISTINCT 
      FORMAT(CONVERT(datetime, dataHora, 120), 'HH:00') AS dataHora1
    FROM Capturas
    WHERE fkEmpresa = ${fkEmpresa}
  ) AS dh
CROSS JOIN Maquinas AS m
LEFT JOIN Capturas AS c
    ON m.idMaquina = c.fkMaquina 
    AND dh.dataHora1 = FORMAT(CONVERT(datetime, c.dataHora, 120), 'HH:00')
    AND c.dataHora >= DATEADD(DAY, -30, GETDATE())
    AND c.fkEmpresa = ${fkEmpresa}
GROUP BY m.nomeMaquina, dh.dataHora1
ORDER BY dh.dataHora1, m.nomeMaquina;`

    console.log("Executando a instrução: " + instrucao);
    return database.executar(instrucao);
}

function maiorConsumoRam(fkEmpresa) {
    console.log("Acessei PEGAR DADOS GRÁFICO EMPILHADO");

    var instrucao = `
    SELECT  top 3 SUM(ramuso) as somaram, FORMAT(CONVERT(datetime, dataHora, 120), 'HH:00') as horaPico FROM [dbo].[Capturas]
    JOIN [dbo].[Maquinas] ON Capturas.fkMaquina = Maquinas.idMaquina
    WHERE Maquinas.fkEmpresa = ${fkEmpresa}
    GROUP BY  FORMAT(CONVERT(datetime, dataHora, 120), 'HH:00')
    ORDER BY somaram desc`

    console.log("Executando a instrução: " + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    autenticarDiretor,
    cadastrar,
    cadastrarFuncionario,
    cadastrarMaquina,
    cadastrarEmpresa1,
    recuperarEmpresa,
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
    vincularDiretor,
    pegarFiliais,
    pegarAlertas,
    rebootar,
    validarReboot,
    pegarDadosGraficoEmpilhado,
    atualizarStatusMaquinas,
    maiorConsumoRam
};