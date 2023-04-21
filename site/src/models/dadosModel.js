var database = require("../database/config");

function buscarUltimasDados(idMaquina) {

    instrucaoSql = '';

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
                order by idcaptura desc limit 10;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosEmTempoReal(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idMaquina} 
                    order by id desc`;

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
                    order by idcaptura desc limit 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function cadastrarDados(cpu, ram, disco, idMaquina) {

    instrucaoSql = '';

    instrucaoSql = `UPDATE Maquinas 
    SET cpuMetrica = ${cpu} AND 
    ramMetrica = ${ram} AND 
    discoMetrica = ${disco}
    WHERE idMaquina = ${idMaquina};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasDados,
    buscarDadosEmTempoReal,
    cadastrarDados
}
