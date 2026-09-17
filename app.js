const express = require("express");
const session = require("express-session"); // Adicionado para gerenciar o login
const app = express();
const porta = 3000;

// Indicação de pasta de arquivos estáticos - css, js, img 
app.use(express.static("./app/public"));

// Configurar o ejs como mecanismo de renderização
app.set("view engine", "ejs");
// Configurar a pasta das views - html->ejs
app.set("views", "./app/views");


// SEMPRE ANTES DA REQUISIÇÃO DAS ROTAS
// Configurar o envio de dados e análise de dados na requisição
// Configurar o payload para formato JSON (API)
app.use(express.json());
// Configurar o payload para formato URLencoded - (form html -> array, objeto, json)
app.use(express.urlencoded({ extended: true }));

// Configuração da Sessão (Guarda se o usuário está logado ou não)
app.use(session({
    secret: 'bioclicky_secret_key_tcc',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 30 } // O login expira após 30 minutos de inatividade
}));


// Requisitar arquivos de rotas
const rota = require("./app/routes/router");
// Indicar o local de uso das rotas
app.use("/", rota);
// ("/") indica a raiz do site 
// http://localhost:3000

// Iniciar o servidor
app.listen(porta, () => {
    console.log(`Servidor on-line \nhttp://localhost:${porta}`)
});
