var database = require("../database/config");

    function exibiralertas(idMaquina) {
        console.log(`Buscando alertas com o IdMaquina = ${idMaquina}`);

        instrucao = `SELECT * FROM Alertas a
        JOIN Log l
           ON l.fkAlerta = a.idAlerta
           AND l.fkMaquina = ${idMaquina};`;
           return database.executar(instrucao);
    }


module.exports = {
    exibiralertas
}