/* ============================================= DATAWATCH =================================================== */

var database = require("../database/config");

function cadastrar(nome, email, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nomeUsuario, email, cpf, senha, adm) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', 'no');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarFuncionario(nome, email, cpf, senha) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFuncionario():", nome, email, cpf, senha);
    var instrucao = `
        INSERT INTO Usuario (nomeUsuario, email, cpf, senha, adm) VALUES ('${nome}', '${email}','${cpf}', '${senha}', 'no');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresa(nomeEmpresa, ramoAtividade, cnpj, cep, rua_av, numero, bairro, cidade, estado, email, telefone) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, ramoAtividade, cnpj, cep, rua_av, numero, bairro, cidade, estado, email, telefone);
    var instrucao = `
        INSERT INTO Empresa (nomeEmpresa, ramoAtividade, CNPJ, CEP, ruaAvenida, numero, bairro, cidade, estado, email, telefone, verificado) VALUES ('${nomeEmpresa}', '${ramoAtividade}','${cnpj}', '${cep}', '${rua_av}','${numero}', '${bairro}', '${cidade}','${estado}', '${email}', '${telefone}', 'no');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMaquina(nome, serie, data, especificacao, setor) {
    console.log("ACESSEI O DATAWATCH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", nome, serie, data, especificacao, setor);

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
    cadastrar,
    cadastrarFuncionario,
    cadastrarMaquina,
    cadastrarEmpresa
};