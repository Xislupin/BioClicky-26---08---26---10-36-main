// Alterna a visibilidade da senha sem alterar seu valor.
document.querySelectorAll(".mostrar-senha").forEach((botao) => {
    botao.addEventListener("click", () => {
        const campo = botao.parentElement.querySelector("input");
        const mostrar = campo.type === "password";
        campo.type = mostrar ? "text" : "password";
        botao.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
        botao.querySelector("ion-icon")?.setAttribute("name", mostrar ? "eye-off-outline" : "eye-outline");
    });
});
