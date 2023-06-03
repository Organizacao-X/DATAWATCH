function reiniciar() {
    var msg = document.getElementsByClassName("msgConfirm");

    fetch(`/datawatch/rebootar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: sessionStorage.ID_MAQUINA,
            fkEmpresaServer: sessionStorage.ID_EMPRESA
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            // window.alert("Máquina reiniciada com sucesso!");
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