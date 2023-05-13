var database = require("../database/config");

    function exibiralertas(idMaquina) {
        console.log(`Buscando alertas com o IdMaquina = ${idMaquina}`);

        instrucao = `SELECT * FROM Possuem 
        JOIN MAQUINAS 
        ON possuem.fkmaquina = maquinas.idMaquina
        WHERE fkMaquina = ${idMaquina}`;
    }


module.exports = {
    exibiralertas
}