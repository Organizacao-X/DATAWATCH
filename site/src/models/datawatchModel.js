/* ============================================= DATAWATCH =================================================== */

var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarFuncionario(nome, email, cpf, senha) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFuncionario():", nome, email, cpf, senha);
    var instrucao = `
        INSERT INTO Usuario (nomeUsuario, email, cpf, senha, adm) VALUES ('${nome}', '${email}','${cpf}', '${senha}', 'no');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMaquina(nome, serie, data, especificacao, setor) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFuncionario():", nome, serie, data, especificacao, setor);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Maquina (nomeMaquina, serie, datadechegada, especificacao, setor) VALUES 
        ('${nome}', '${serie}','${data}', '${especificacao}', '${setor}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    cadastrarFuncionario,
    cadastrarMaquina
};