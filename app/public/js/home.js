const botaoMenu = document.querySelector('.menu-mobile');
const menu = document.querySelector('.menu');

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('aberto');

    const aberto = menu.classList.contains('aberto');

    botaoMenu.setAttribute('aria-expanded', aberto);
});