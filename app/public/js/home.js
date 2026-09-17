// Arquivo antigo, mantido como referência. As páginas atuais carregam site.js.
const botaoMenu = document.querySelector('.menu-mobile');
const menu = document.querySelector('.menu');

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('aberto');

    const aberto = menu.classList.contains('aberto');

    botaoMenu.setAttribute('aria-expanded', aberto);
});
