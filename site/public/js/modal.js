let $ = document

const botaoEditar = $.querySelector('.abrir-editar')
const botaoExcluir = $.querySelector('.abrir-excluir')


const modallParent1 = $.querySelector('.modal-parent1')
const modallParent2 = $.querySelector('.modal-parent2')

const x = $.querySelector('.X')
const sair = $.querySelector('.exit')

const cancelEdit = $.querySelector('#cancel_edit')
const cancelDelete = $.querySelector('#cancel_delete')

const saveEdit = $.querySelector('#save_edit')
const saveDelete = $.querySelector('#save_delete')

const sectionElem1 = $.querySelector('.parte1')
const sectionElem2 = $.querySelector('.parte2')

const textoAlertaSave = $.querySelector('.texto-alerta')

function showModalEditar() {
    modallParent1.style.display = 'block'
    sectionElem1.style.filter = 'blur(5px)'
    sectionElem2.style.filter = 'blur(5px)'
    botaoEditar.blur()
}

function showModalExcluir(){
    modallParent2.style.display = 'block'
    sectionElem1.style.filter = 'blur(5px)'
    sectionElem2.style.filter = 'blur(5px)'
    botaoExcluir.blur()
}



function hideModalWithCancelEditar() {
    modallParent1.style.display = 'none'
    sectionElem1.style.filter = 'blur(0px)'
    sectionElem2.style.filter = 'blur(0px)'
    textoAlertaSave.style.display = 'none'
}

function hideModalWithSaveEditar() {
    sectionElem1.style.filter = 'blur(0px)'
    sectionElem2.style.filter = 'blur(0px)'
    textoAlertaSave.style.display = 'block'
}

function hideModalWithCancelExcluir(){
    modallParent2.style.display = 'none'
    sectionElem1.style.filter = 'blur(0px)'
    sectionElem2.style.filter = 'blur(0px)'
}

function hideModalWithSaveExcluir() {
    modallParent2.style.display = 'none'
    sectionElem1.style.filter = 'blur(0px)'
    sectionElem2.style.filter = 'blur(0px)'
}



function hideModalWithEscEditar(event) {
    if (event.keyCode === 27) {
        modallParent1.style.display = 'none'
        sectionElem1.style.filter = 'blur(0px)'
        sectionElem2.style.filter = 'blur(0px)'

    }
}

function hideModalWithEscExcluir(event) {
    if (event.keyCode === 27) {
        modallParent2.style.display = 'none'
        sectionElem1.style.filter = 'blur(0px)'
        sectionElem2.style.filter = 'blur(0px)'
    }
}


botaoEditar.addEventListener('click', showModalEditar)
x.addEventListener('click', hideModalWithCancelEditar)
cancelEdit.addEventListener('click', hideModalWithCancelEditar)
saveEdit.addEventListener('click',hideModalWithSaveEditar)
document.body.addEventListener('keyup', hideModalWithEscEditar)

botaoExcluir.addEventListener('click', showModalExcluir)
sair.addEventListener('click', hideModalWithCancelExcluir)
cancelDelete.addEventListener('click', hideModalWithCancelExcluir)
saveDelete.addEventListener('click',hideModalWithSaveExcluir)
document.body.addEventListener('keyup', hideModalWithEscExcluir)

