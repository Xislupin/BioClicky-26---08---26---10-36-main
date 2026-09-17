const olho = document.getElementById("toggleSenha");
const senha = document.querySelector('input[name="senha"]');

olho.addEventListener("click", () => {

    if (senha.type === "password") {

        senha.type = "text";
        olho.setAttribute("name", "eye-off-outline");

    } else {

        senha.type = "password";
        olho.setAttribute("name", "eye-outline");

    }

});
