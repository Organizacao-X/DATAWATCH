function getUuid() {
    var uuid = sessionStorage.UUID;
    var usuario = sessionStorage.NOME_USUARIO;
    if (usuario == undefined) {
        span_usuario.innerHTML = `Olá, visitante!`
    } else {
        span_usuario.innerHTML = `Olá, ${usuario}!`
    }

    mostrarFiliais(uuid)
}

function mostrarFiliais(uuid) {
    fetch("/datawatch/pegarFiliais", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uuidServer: uuid
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(dados => {
                console.log(dados);
                localStorage.setItem("dadosFiliais", JSON.stringify(dados));
                if (dados.length > 0) {
                    dados.forEach(filial => {

                        var alerts;

                        if (localStorage.getItem(`${filial.razaoSocial}`) == undefined) {
                            alerts = {
                                sumStorage: 50,
                                qtdStorage: 5
                            }
                        } else {
                            alerts = JSON.parse(`${localStorage.getItem(filial.razaoSocial)}`);
                        }

                        console.log(alerts)

                        // Pega o id da tag ul e atribui a uma variável
                        var listaFiliais = document.getElementById("ul_cards_filiais");

                        /* Criação do card */
                        var li = document.createElement("li")
                        li.setAttribute("class", "card")
                        listaFiliais.appendChild(li);

                        var titleFilial = document.createElement("h3");
                        li.appendChild(titleFilial);
                        titleFilial.innerHTML = `${filial.razaoSocial}`;

                        var upSide = document.createElement("div");
                        upSide.setAttribute("class", "cubeLikeUp");
                        li.appendChild(upSide);

                        /* PARTE DE CIMA DO CARD */
                        /* ------ ESQUERDA: ---------- */
                        var adm = document.createElement("div");
                        adm.setAttribute("class", "admInfo");
                        upSide.appendChild(adm);

                        var divIcon = document.createElement("div")
                        divIcon.setAttribute("class", "icon")
                        adm.appendChild(divIcon);

                        var respInfo = document.createElement("div");
                        respInfo.setAttribute("class", "responsavelInfo");
                        adm.appendChild(respInfo);
                        respInfo.innerHTML = `<b>Responsável:</b>
                        <p>${filial.administrador}</p>
                        <p>${filial.email}</p>`
                        /* ----------------------- */

                        /* ------ DIREITA: ------ */
                        var divFilial = document.createElement("div")
                        divFilial.setAttribute("class", "maquinaInfo")
                        upSide.appendChild(divFilial);

                        var titlePerct = document.createElement("b");
                        divFilial.appendChild(titlePerct);
                        titlePerct.innerHTML = `Máquinas ativas:`;

                        var maqPerct = document.createElement("b");
                        maqPerct.setAttribute("class", "largeFont");
                        divFilial.appendChild(maqPerct);
                        var maqAtiv = filial.maquinasAtivas;
                        var maqQtd = filial.qtdMaquinas;
                        var porcentagem;

                        if (maqQtd == 0 || maqAtiv == 0) {
                            porcentagem = 0;
                        } else {
                            porcentagem = ((maqAtiv / maqQtd) * 100);
                        }

                        maqPerct.innerHTML = `${porcentagem.toFixed(1)}%`;

                        if (porcentagem < 50
                            || filial.somaPeso >= alerts.sumStorage
                            || filial.somaPeso >= alerts.qtdStorage) {
                            li.style = "background-color: rgb(255, 179, 179)"
                        } else if (porcentagem < 75
                            || filial.somaPeso >= ((alerts.sumStorage / 3) *2)
                            || filial.somaPeso >= ((alerts.qtdStorage / 3) *2)) {
                            li.style = "background-color: rgb(255, 254, 167)"
                        } else {
                            li.style = "background-color: rgb(189, 255, 188)"
                        }
                        /* ----------------------- */

                        /* PARTE DE BAIXO DO CARD */
                        var downSide = document.createElement("div");
                        downSide.setAttribute("class", "cubeLikeDown");
                        li.appendChild(downSide);

                        /* ------ ESQUERDA: ------ */
                        var adress = document.createElement("div");
                        adress.setAttribute("class", "adressInfo");
                        downSide.appendChild(adress);
                        adress.innerHTML = `<b>${filial.logradouro}, 
                            ${filial.numero} - ${filial.bairro}, 
                            ${filial.cidade} - ${filial.estado}</b>`;
                        /* ----------------------- */

                        /* ------ DIREITA: ------ */
                        var alertas = document.createElement("div");
                        alertas.setAttribute("class", "alertaPeso");
                        downSide.appendChild(alertas);

                        var alertTitle = document.createElement("b");
                        alertas.appendChild(alertTitle);
                        alertTitle.innerHTML = `Peso total dos alertas`;

                        var auxDiv = document.createElement("div");
                        auxDiv.setAttribute("class", "alerts");
                        alertas.appendChild(auxDiv);

                        var qtdAlerts = document.createElement("b");
                        qtdAlerts.setAttribute("class", "largeFont");
                        auxDiv.appendChild(qtdAlerts);
                        qtdAlerts.innerHTML = `${filial.somaPeso}`;

                        var iconAlert = document.createElement("div");
                        iconAlert.setAttribute("class", "alert");
                        iconAlert.setAttribute("data-tooltip", `Quantidade de alertas: ${filial.qtdLogs}`);
                        auxDiv.appendChild(iconAlert);

                        var imgAlert = document.createElement("img");
                        imgAlert.setAttribute("src", "./assets/imgs/aviso.png");
                        imgAlert.setAttribute("width", "50px");
                        iconAlert.appendChild(imgAlert);
                        /* ----------------------- */
                    });
                }

            })
        }
        else {
            throw (JSON.stringify(resposta))
        }
    }).catch(function (resposta) {
        console.log(`ERRO: ${resposta}`);
    })
    return false
}

function validacao() {
    var resposta = true;

    // Validação de campos vazios
    if (selectFiliais.value == "optSelect") {
        selectFiliais.style.borderBottom = "var(--bordaCampos)";
        aviso.style.color = "var(--cinzaElegante)";

        resposta = false
    } else {
        selectFiliais.style.borderBottom = "none";
        aviso.style.color = "#0000";
    }

    if (somaInput.value == "") {
        somaInput.style.borderBottom = "var(--bordaCampos)";
        aviso.style.color = "var(--cinzaElegante)";

        resposta = false
    } else {
        somaInput.style.borderBottom = "none";
        aviso.style.color = "#0000";
    }

    if (quantidadeInput.value == "") {
        quantidadeInput.style.borderBottom = "var(--bordaCampos)";
        aviso.style.color = "var(--cinzaElegante)";

        resposta = false
    } else {
        quantidadeInput.style.borderBottom = "none";
        aviso.style.color = "#0000";
    }

    return resposta;
}

function setAlert() {
    if (validacao()) {
        aviso.style.color = "var(--cinzaElegante)"
        aviso.innerHTML = `Alertas de ${selectFiliais.value} parametrizados com sucesso!`;
        console.log("Teste inputs:")
        console.log(selectFiliais.value)
        console.log(somaInput.value)
        console.log(quantidadeInput.value)

        console.log("Teste JSON:")
        var filial = selectFiliais.value;
        var valores = {
            sumStorage: somaInput.value,
            qtdStorage: quantidadeInput.value
        }
        console.log(filial)
        console.log(`Teste stringify: ${JSON.stringify(valores)}`)
        console.log(valores.sumStorage)
        console.log(valores.qtdStorage)

        localStorage.setItem(`${filial}`, `${JSON.stringify(valores)}`);
        document.getElementById("ul_cards_filiais").innerHTML = "";
        getUuid()
    }
}