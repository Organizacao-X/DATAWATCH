let $ = document;
// modais
const modalEditarFuncionario = $.querySelector('.modal-parent1');
const modalDesativarFuncionario = $.querySelector('.modal-parent2');
const modalMostrarMais = $.querySelector('.modal-parent3');
const modalEditarDateReiniciar = $.querySelector('.modal-parent4');
const modalReiniciar = $.querySelector('.modal-parent5');

// sessão
const sessaoElem = $.querySelector('section');

// Maquina lista
const buttonMostrarMais = $.querySelector('.mais');

const x3 = $.querySelector('.X-3');

function abrirModalMostrarMais() {
    modalMostrarMais.style.display = 'block'
    sessaoElem.style.filter = 'blur(10px)'
    buttonMostrarMais.blur()
}

    function fecharModalMostrarMaisComX() {
    modalMostrarMais.style.display = 'none'
    sessaoElem.style.filter = 'blur(0px)'
}

function fecharModalMostrarMaisComEsc(event) {
    if (event.keyCode === 27) {
        modalMostrarMais.style.display = 'none'
        sessaoElem.style.filter = 'blur(0px)'
    }
}

buttonMostrarMais.addEventListener('click', abrirModalMostrarMais)
x3.addEventListener('click', fecharModalMostrarMaisComX)
document.body.addEventListener('keyup', fecharModalMostrarMaisComEsc)

// funcionarios
const buttonEditFuncionario = $.querySelector('.abrir-editar');
const buttonDesativarFuncionario = $.querySelector('.abrir-desativar');

const buttonSalvarEdit = $.querySelector('#save_edit');
const buttonCancelarEdit = $.querySelector('#cancel_edit');

const buttonConfirmDesativar = $.querySelector('#save_deactivate')
const buttonCancelarDesativar = $.querySelector('#cancel_deactivate')

const x1 = $.querySelector('.X-1');
const x2 = $.querySelector('.X-2');

function abrirModalEditarFuncionario() {
    modalEditarFuncionario.style.display = 'block'
    sessaoElem.style.filter = 'blur(10px)'
    buttonEditFuncionario.blur()
}

function fecharModalEditarFuncionarioComX() {
    modalEditarFuncionario.style.display = 'none'
    sessaoElem.style.filter = 'blur(0px)'
}

function fecharModalEditarFuncionarioComEsc(event) {
    if (event.keyCode === 27) {
        modalEditarFuncionario.style.display = 'none'
        sessaoElem.style.filter = 'blur(0px)'
    }
}

buttonEditFuncionario.addEventListener('click', abrirModalEditarFuncionario)
x1.addEventListener('click', fecharModalEditarFuncionarioComX)
document.body.addEventListener('keyup', fecharModalEditarFuncionarioComEsc)

buttonSalvarEdit.addEventListener('click', fecharModalEditarFuncionarioComX)
buttonCancelarEdit.addEventListener('click', fecharModalEditarFuncionarioComX)


function abrirModalDesativarFuncionario() {
    modalDesativarFuncionario.style.display = 'block'
    sessaoElem.style.filter = 'blur(10px)'
    buttonDesativarFuncionario.blur()
}

function fecharModalDesativarFuncionarioComX() {
    modalDesativarFuncionario.style.display = 'none'
    sessaoElem.style.filter = 'blur(0px)'
}

function fecharModalDesativarFuncionarioComEsc(event) {
    if (event.keyCode === 27) {
        modalDesativarFuncionario.style.display = 'none'
        sessaoElem.style.filter = 'blur(0px)'
    }
}

buttonDesativarFuncionario.addEventListener('click', abrirModalDesativarFuncionario)
x2.addEventListener('click', fecharModalDesativarFuncionarioComX)
document.body.addEventListener('keyup', fecharModalDesativarFuncionarioComEsc)

buttonConfirmDesativar.addEventListener('click', fecharModalDesativarFuncionarioComX)
buttonCancelarDesativar.addEventListener('click', fecharModalDesativarFuncionarioComX)


// execução maquinas
const buttonEditarDateReiniciar = $.querySelector('.edit-date');
const buttonReiniciar = $.querySelector('.reload');

const buttonConfirmReiniciar = $.querySelector('#confirm_reiniciar')
const buttonCancelarReiniciar = $.querySelector('#cancel_reiniciar')

const buttonSalvarEditDate = $.querySelector('#save_date')
const buttonCancelarEditDate = $.querySelector('#cancel_date')

const x4 = $.querySelector('.X-4');
const x5 = $.querySelector('.X-5');

function abrirModalEditarDateReiniciar() {
    modalEditarDateReiniciar.style.display = 'block'
    sessaoElem.style.filter = 'blur(10px)'
    buttonEditarDateReiniciar.blur()
}

function fecharModalEditarDateReiniciarComX() {
    modalEditarDateReiniciar.style.display = 'none'
    sessaoElem.style.filter = 'blur(0px)'
}

function fecharModalEditarDateReiniciarComEsc(event) {
    if (event.keyCode === 27) {
        modalEditarDateReiniciar.style.display = 'none'
        sessaoElem.style.filter = 'blur(0px)'
    }
}

buttonEditarDateReiniciar.addEventListener('click', abrirModalEditarDateReiniciar)
x4.addEventListener('click', fecharModalEditarDateReiniciarComX)
document.body.addEventListener('keyup', fecharModalEditarDateReiniciarComEsc)

buttonSalvarEditDate.addEventListener('click', fecharModalEditarDateReiniciarComX)
buttonCancelarEditDate.addEventListener('click', fecharModalEditarDateReiniciarComX)

function abrirModalReiniciar() {
    modalReiniciar.style.display = 'block'
    sessaoElem.style.filter = 'blur(10px)'
    buttonReiniciar.blur()
}

function fecharModalReiniciarComX() {
    modalReiniciar.style.display = 'none'
    sessaoElem.style.filter = 'blur(0px)'
}

function fecharModalReiniciarComEsc(event) {
    if (event.keyCode === 27) {
        modalReiniciar.style.display = 'none'
        sessaoElem.style.filter = 'blur(0px)'
    }
}

buttonReiniciar.addEventListener('click', abrirModalReiniciar)
x5.addEventListener('click', fecharModalReiniciarComX)
document.body.addEventListener('keyup', fecharModalReiniciarComEsc)

buttonConfirmReiniciar.addEventListener('click', fecharModalReiniciarComX)
buttonCancelarReiniciar.addEventListener('click', fecharModalReiniciarComX)