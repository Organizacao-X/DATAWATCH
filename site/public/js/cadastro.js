function cadastrar() {
    /* aguardar(); */

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var cpfVar = cpf_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "" || cpfVar == "") {
        /* cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)"; */

        /* finalizarAguardar(); */
        return false;
    }
    else {
        /* setInterval(sumirMensagem, 5000) */
    }

    // Enviando o valor da nova input
    fetch("/datawatch/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            nomeServer: nomeVar,
            emailServer: emailVar,
            cpfServer: cpfVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            /* cardErro.style.display = "block"; */

            /* mensagem_erro.innerHTML = "Cadastro de funcionário realizado com sucesso!"; */

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")
            
            limparFormulario();
            /* finalizarAguardar(); */
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        /* finalizarAguardar(); */
    });

    return false;
}