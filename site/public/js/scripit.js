function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../public/assets/imgs/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../public/assets/imgs/close_white_36dp.svg";
    }
}
var brabo = false;
function mostrarBrabo() {
    var lucas = document.getElementById("lucas");
    if (brabo) {
        brabo = false;
        lucas.style = "background-image: url(../assets/imgs/Card\ client\ 1\ Lucas.png)";
    } else {
        brabo = true;
        lucas.style = "background-image: url(./assets/imgs/lucasPose.png)";
    }

}