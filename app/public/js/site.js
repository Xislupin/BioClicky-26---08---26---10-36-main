// Controla o menu no celular e mantém os atributos de acessibilidade corretos.
const botaoMenu = document.querySelector(".menu-mobile");
const menu = document.querySelector(".menu");

if (botaoMenu && menu) {
    const fecharMenu = () => {
        menu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
        botaoMenu.querySelector("ion-icon")?.setAttribute("name", "menu-outline");
    };

    botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("aberto");
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        botaoMenu.querySelector("ion-icon")?.setAttribute("name", aberto ? "close-outline" : "menu-outline");
    });

    document.addEventListener("click", (evento) => {
        if (!evento.target.closest(".cabecalho")) fecharMenu();
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") fecharMenu();
    });
}
