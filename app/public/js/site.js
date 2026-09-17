// Controla o menu no celular e mantém os atributos de acessibilidade corretos.
// Localiza no HTML o botão do menu e a lista de links.
const botaoMenu = document.querySelector(".menu-mobile");
const menu = document.querySelector(".menu");

// Só registra eventos nas páginas que possuem o cabeçalho público.
if (botaoMenu && menu) {
    // Oculta os links e informa aos leitores de tela que o menu está fechado.
    const fecharMenu = () => {
        menu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
        botaoMenu.querySelector("ion-icon")?.setAttribute("name", "menu-outline");
    };

    // Ao tocar no botão, alterna entre menu aberto e fechado.
    botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("aberto");
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        botaoMenu.querySelector("ion-icon")?.setAttribute("name", aberto ? "close-outline" :
            "menu-outline");
    });

    // Fecha o menu quando o usuário toca fora do cabeçalho.
    document.addEventListener("click", (evento) => {
        if (!evento.target.closest(".cabecalho")) {
            fecharMenu();
        }
    });

    // Permite fechar o menu usando a tecla Escape.
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharMenu();
        }
    });
}
