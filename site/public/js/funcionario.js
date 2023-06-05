function reiniciar(idMaquina) {
    fetch(`/datawatch/rebootar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: idMaquina,
            fkEmpresaServer: sessionStorage.ID_EMPRESA
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            msg[0].innerHTML = "Requisição enviada";
            msg[0].style.color = "#000";
            msg[0].style.animation = "fade-in 1s ease-in-out";
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar rebootar a máquina: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function validarReboot(idMaquina) {
    var botoes = document.getElementsByClassName("opcao2");
    fetch(`/datawatch/validarReboot`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: idMaquina,
            fkEmpresaServer: sessionStorage.ID_EMPRESA
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(dados => {
                console.log(dados)
                if (dados[0].rebootar == 1) {
                    botoes[0].style.display = "none"
                    msg[0].innerHTML = "Requisição já foi enviada, aguarde a reinicialização";
                    msg[0].style.color = "#000";
                    msg[0].style.animation = "fade-in 1s ease-in-out";
                } else {
                    botoes[0].style.display = "block"                
                }
            });
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar rebootar a máquina: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false;
}