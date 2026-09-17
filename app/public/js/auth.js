// Alterna a visibilidade da senha sem alterar seu valor.
document.querySelectorAll(".mostrar-senha").forEach((botao) => {
    // Cada botão controla somente o campo de senha ao seu lado.
    botao.addEventListener("click", () => {
        const campo = botao.parentElement.querySelector("input");
        const mostrar = campo.type === "password";
        // O tipo text mostra o conteúdo; password mostra pontos.
        campo.type = mostrar ? "text" : "password";
        // Atualiza o nome acessível e o ícone do botão.
        botao.setAttribute("aria-label", mostrar ? "Ocultar senha" :
            "Mostrar senha");
        botao.querySelector("ion-icon")?.setAttribute("name", mostrar ?
            "eye-off-outline" : "eye-outline");
    });
});
