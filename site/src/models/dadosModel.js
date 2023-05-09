var database = require("../database/config");

function buscarUltimasDados(idMaquina) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 10
    c.redeUpload AS upload,
    c.redeDownload AS download,
    c.cpuUso AS cpuuso,
    c.temperatura AS temperatura,
    c.ramUso AS ramuso,
    c.Livredisco1 AS discolivre1,
    c.Livredisco2 AS discolivre2,
    c.Livredisco3 AS discolivre3,
    m.totalDisco1 AS discoTotal1,
    m.totalDisco2 AS discoTotal2,
    m.totalDisco3 AS discoTotal3,
    m.ramTotal AS ramTotal,
    m.cpuMetrica AS processadorMetrica,
    m.ramMetrica AS ramMetrica,
    m.gatilhodisco1 AS discoMetrica1,
    m.gatilhodisco2 AS discoMetrica2,
    m.gatilhodisco3 AS discoMetrica3,
    c.datahora,
    FORMAT(datahora, 'HH:mm:ss') AS horario
FROM Capturas AS c
JOIN Maquinas AS m ON c.fkmaquina = m.idmaquina
WHERE c.fkMaquina = ${idMaquina}
ORDER BY c.idcaptura DESC;
`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
    c.redeUpload AS upload,
    c.redeDownload AS download,
    c.cpuUso AS cpuuso,
    c.temperatura AS temperatura,
    c.ramUso AS ramuso,
    c.discoLivre AS discolivre,
    m.totalDisco1 AS discoTotal,
    m.ramTotal AS ramTotal,
    m.cpuMetrica AS processadorMetrica,
    m.ramMetrica AS ramMetrica,
    m.gatilhodisco1 AS discoMetrica1,
    m.gatilhodisco2 AS discoMetrica2,
    m.gatilhodisco3 AS discoMetrica3,
    c.datahora,
    DATE_FORMAT(c.datahora,'%H:%i:%s') as horario
FROM Capturas AS c
JOIN Maquinas AS m ON c.fkmaquina = m.idmaquina
WHERE c.fkMaquina = ${idMaquina}
ORDER BY c.idcaptura DESC limit 10;
`;
    }



    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosEmTempoReal(idMaquina, idEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 10
        c.fkmaquina AS maquina,
		c.fkEmpresa AS empresa,
        c.redeUpload AS upload,
        c.redeDownload AS download,
        c.cpuUso AS cpuuso,
        c.temperatura AS temperatura,
        c.ramUso AS ramuso,
        c.LivreDisco1 AS discolivre,
        m.totalDisco1 AS discoTotal,
        m.ramTotal AS ramTotal,
        m.cpuMetrica AS processadorMetrica,
        m.ramMetrica AS ramMetrica,
        m.gatilhodisco1 AS discoMetrica1,
        m.gatilhodisco2 AS discoMetrica2,
        m.gatilhodisco3 AS discoMetrica3,
        c.datahora,
        FORMAT(datahora, 'HH:mm:ss') AS horario
    FROM Capturas AS c
    join Maquinas as m
                    ON c.fkmaquina = m.idmaquina
                    where fkMaquina = ${idMaquina}
                    and c.fkEmpresa = ${idEmpresa}
                    order by horario, idcaptura desc;
                    `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        c.redeUpload as upload, 
        c.redeDownload as download,
        c.cpuUso as cpuuso,
        c.temperatura as temperatura,
        c.ramUso as ramuso,
        c.discoLivre as discolivre,
        m.discoTotal as discoTotal,
        m.ramTotal as ramTotal,
        m.cpuMetrica as processadorMetrica,
        m.ramMetrica as ramMetrica,
        m.discoMetrica as discoMetrica,
                        c.datahora,
                        DATE_FORMAT(c.datahora,'%H:%i:%s') as horario
                    from Capturas as c
                    join Maquinas as m
                    ON c.fkmaquina = m.idmaquina
                    where fkMaquina = ${idMaquina}
                    and c.fkEmpresa = ${idEmpresa}
                    order by horario, idcaptura desc limit 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function cadastrarDados(cpu, ram, disco, idMaquina) {

//     instrucaoSql = '';

//     if (process.env.AMBIENTE_PROCESSO == "produção") {

//         instrucaoSql = `UPDATE Maquinas 
//     SET cpuMetrica = ${cpu} AND 
//     ramMetrica = ${ram} AND 
//     gatilhoDisco = ${disco}
//     WHERE idMaquina = ${idMaquina};`;

//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

//         instrucaoSql = `UPDATE Maquinas 
//     SET cpuMetrica = ${cpu} AND 
//     ramMetrica = ${ram} AND 
//     gatilhoDisco = ${disco}
//     WHERE idMaquina = ${idMaquina};`;

//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


module.exports = {
    buscarUltimasDados,
    buscarDadosEmTempoReal,
    // cadastrarDados
}
