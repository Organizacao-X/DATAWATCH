var database = require("../database/config");

function buscarUltimasDados() {

    instrucaoSql = '';

    instrucaoSql = `select 
    redeUpload as upload, 
    redeDownload as download,
    cpuUso as cpuuso,
    temperatura as temperatura,
    ramUso as ramuso,
    discoLivre as discolivre,
                    datahora,
                    DATE_FORMAT(datahora,'%H:%i:%s') as horario
                from capturas
                where fkMaquina = 1
                order by idcaptura desc limit 5;`;

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
        redeUpload as upload, 
        redeDownload as download,
        cpuUso as cpuuso,
        temperatura as temperatura,
        ramUso as ramuso,
        discoLivre as discolivre,
                        datahora,
                        DATE_FORMAT(datahora,'%H:%i:%s') as horario
                    from capturas
                    where fkMaquina = 1
                    order by idcaptura desc limit 5;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasDados,
    buscarDadosEmTempoReal
}
