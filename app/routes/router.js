// As rotas ligam cada endereço do site a uma página EJS.
const express = require("express");
const router = express.Router();

// Dados provisórios para o protótipo. Depois podem vir do MySQL.
const medicamentos = [{
        id: 101,
        nome: "Dipirona 500mg",
        laboratorio: "Medley",
        categoria: "Dor e febre",
        descricao: "Analgésico e antitérmico",
        imagem: "/imagens/main-1/dipirona.webp",
        menorPreco: 7.90,
        ofertas: 8,
        farmacia: "Drogasil"
    },
    {
        id: 102,
        nome: "Dorflex",
        laboratorio: "Sanofi",
        categoria: "Dor e febre",
        descricao: "Analgésico e relaxante muscular",
        imagem: "/imagens/main-1/dorflex.webp",
        menorPreco: 8.90,
        ofertas: 5,
        farmacia: "Droga Raia"
    },
    {
        id: 103,
        nome: "Cetirizina 10mg",
        laboratorio: "Medley",
        categoria: "Alergia",
        descricao: "Medicamento antialérgico",
        imagem: "/imagens/main-1/cetirizina.webp",
        menorPreco: 11.80,
        ofertas: 3,
        farmacia: "Pague Menos"
    },
    {
        id: 104,
        nome: "Paracetamol 750mg",
        laboratorio: "Cimed",
        categoria: "Dor e febre",
        descricao: "Analgésico e antitérmico",
        imagem: "/imagens/main-1/paracetamol.webp",
        menorPreco: 11.90,
        ofertas: 6,
        farmacia: "Drogaria São Paulo"
    },
    {
        id: 105,
        nome: "Losartana 50mg",
        laboratorio: "Neo Química",
        categoria: "Pressão alta",
        descricao: "Anti-hipertensivo",
        imagem: "/imagens/main-1/paracetamol.png",
        menorPreco: 8.00,
        ofertas: 4,
        farmacia: "Ultrafarma"
    }
];

// Farmácias de exemplo; estes dados ainda não vêm de um banco.
const farmacias = [{
        id: 1,
        nome: "Droga Raia",
        nota: 4.3,
        cidade: "São Paulo",
        endereco: "Rua Augusta, 2200",
        telefone: "(11) 3120-5500",
        parceira: true
    },
    {
        id: 2,
        nome: "Drogasil",
        nota: 4.5,
        cidade: "São Paulo",
        endereco: "Avenida Paulista, 1540",
        telefone: "(11) 3254-1234",
        parceira: true
    },
    {
        id: 3,
        nome: "Ultrafarma",
        nota: 4.4,
        cidade: "São Paulo",
        endereco: "Rua Vergueiro, 800",
        telefone: "(11) 4002-8922",
        parceira: true
    },
    {
        id: 4,
        nome: "Pague Menos",
        nota: 4.2,
        cidade: "Barueri",
        endereco: "Av. Brigadeiro Faria Lima, 1800",
        telefone: "(11) 4004-8000",
        parceira: true
    }
];

// Categorias usadas pelos filtros e pelos atalhos das páginas.
const categorias = [{
        nome: "Dor e febre",
        icone: "thermometer-outline",
        descricao: "Analgésicos e antitérmicos"
    },
    {
        nome: "Alergia",
        icone: "flower-outline",
        descricao: "Antialérgicos"
    },
    {
        nome: "Pressão alta",
        icone: "heart-outline",
        descricao: "Anti-hipertensivos"
    },
    {
        nome: "Diabetes",
        icone: "water-outline",
        descricao: "Controle da glicemia"
    },
    {
        nome: "Gripe e resfriado",
        icone: "medkit-outline",
        descricao: "Alívio dos sintomas"
    },
    {
        nome: "Vitaminas",
        icone: "sunny-outline",
        descricao: "Vitaminas e suplementos"
    }
];

// Variáveis disponíveis automaticamente em todas as páginas.
router.use((req, res, next) => {
    res.locals.logado = Boolean(req.session.usuarioId);
    res.locals.usuario = req.session.usuarioNome || null;
    res.locals.rotaAtual = req.path;
    next();
});

// Permite continuar apenas quando existe um usuário na sessão.
function requerLogin(req, res, next) {
    if (req.session.usuarioId) {
        return next();
    }
    return res.redirect("/login?retorno=/perfil");
}

// Protege as rotas administrativas usando a sessão do administrador.
function requerAdmin(req, res, next) {
    if (req.session.adminId) {
        return next();
    }
    return res.redirect("/admin");
}

// Exibe a página /.
router.get("/", (req, res) => res.render("pages/home", {
    categorias: categorias.slice(0, 4)
}));

// Exibe a página /remedios.
router.get("/remedios", (req, res) => {
    // Lê os filtros da URL e padroniza o texto para comparar a busca.
    const busca = String(req.query.q || "").trim().toLowerCase();
    const categoria = String(req.query.categoria || "").trim().toLowerCase();
    const resultado = medicamentos.filter((item) => {
        // Monta o texto pesquisável de cada medicamento.
        const texto = `${item.nome} ${item.laboratorio} ${item.descricao}`.toLowerCase();
        const correspondeBusca = !busca || texto.includes(busca);
        const correspondeCategoria = !categoria || item.categoria.toLowerCase() === categoria;

        // Mantém apenas os medicamentos que atendem aos dois filtros.
        return correspondeBusca && correspondeCategoria;
    });
    // Entrega os resultados e os valores dos filtros para o EJS.
    res.render("pages/remedios", {
        remedios: resultado,
        categorias,
        busca: req.query.q || "",
        categoria: req.query.categoria || ""
    });
});

// Exibe a página /farmacias.
router.get("/farmacias", (req, res) => {
    const busca = String(req.query.q || "").trim().toLowerCase();
    const resultado = farmacias.filter((item) =>
        `${item.nome} ${item.cidade} ${item.endereco}`.toLowerCase().includes(busca));
    res.render("pages/farmacias", {
        farmacias: resultado,
        busca: req.query.q || ""
    });
});

// Exibe a página /categorias.
router.get("/categorias", (req, res) => res.render("pages/categorias", {
    categorias,
    medicamentos
}));
// Exibe a página /sobre.
router.get("/sobre", (req, res) => res.render("pages/sobre"));

// Exibe a página /login.
router.get("/login", (req, res) => {
    // Quem já entrou vai direto para a página de perfil.
    if (req.session.usuarioId) {
        return res.redirect("/perfil");
    }

    res.render("pages/login", { erro: null });
});
// Recebe o formulário de /login.
router.post("/login", (req, res) => {
    const {
        email,
        senha
    } = req.body;
    if (!email || !senha) return res.status(400).render("pages/login", {
        erro: "Preencha o e-mail e a senha."
    });
    req.session.usuarioId = 1;
    req.session.usuarioNome = email.split("@")[0];
    req.session.usuarioEmail = email;
    res.redirect("/perfil");
});

// Exibe a página /cadastro.
router.get("/cadastro", (req, res) => res.render("pages/cadastro", {
    erro: null
}));
// Recebe o formulário de /cadastro.
router.post("/cadastro", (req, res) => {
    const {
        nome,
        email,
        senha,
        confirmarSenha
    } = req.body;
    if (!nome || !email || !senha || !confirmarSenha) return res.status(400).render(
        "pages/cadastro", {
            erro: "Preencha todos os campos."
        });
    if (senha.length < 6) return res.status(400).render("pages/cadastro", {
        erro: "A senha deve ter pelo menos 6 caracteres."
    });
    if (senha !== confirmarSenha) return res.status(400).render("pages/cadastro", {
        erro: "As senhas não coincidem."
    });
    req.session.usuarioId = 1;
    req.session.usuarioNome = nome;
    req.session.usuarioEmail = email;
    res.redirect("/perfil");
});

// Exibe a página /senha.
router.get("/senha", (req, res) => res.render("pages/senha", {
    enviado: false
}));
// Recebe o formulário de /senha.
router.post("/senha", (req, res) => res.render("pages/senha", {
    enviado: true
}));
// Recebe o formulário de /sair.
router.post("/sair", (req, res) => req.session.destroy(() => res.redirect("/")));

// Exibe a página /perfil.
router.get("/perfil", requerLogin, (req, res) => res.render("pages/perfil", {
    nome: req.session.usuarioNome,
    email: req.session.usuarioEmail,
    telefone: req.session.usuarioTelefone || "",
    localizacao: req.session.usuarioLocalizacao || "São Paulo - SP",
    salvo: req.query.salvo === "1"
}));
// Recebe o formulário de /perfil.
router.post("/perfil", requerLogin, (req, res) => {
    req.session.usuarioTelefone = req.body.telefone;
    req.session.usuarioLocalizacao = req.body.localizacao;
    res.redirect("/perfil?salvo=1");
});

// Exibe a página /admin.
router.get("/admin", (req, res) => req.session.adminId ? res.redirect("/admin/dashboard") : res
    .render("pages/admin", {
        erro: null
    }));
// Recebe o formulário de /admin/login.
router.post("/admin/login", (req, res) => {
    if (req.body.email === "admin@bioclicky.com" && req.body.senha === "123456") {
        req.session.adminId = 1;
        req.session.adminNome = "Administrador";
        return res.redirect("/admin/dashboard");
    }
    res.status(401).render("pages/admin", {
        erro: "E-mail ou senha de administrador incorretos."
    });
});

// Exibe a página /admin/dashboard.
router.get("/admin/dashboard", requerAdmin, (req, res) => res.render("pages/admin-dashboard", {
    admin: req.session.adminNome,
    estatisticas: {
        usuarios: 128,
        pesquisas: 3284,
        medicamentos: medicamentos.length,
        farmacias: farmacias.length
    }
}));
// Exibe a página /admin/usuarios.
router.get("/admin/usuarios", requerAdmin, (req, res) => res.render("pages/admin-lista", {
    titulo: "Usuários",
    tipo: "usuarios",
    itens: [{
            id: 1,
            nome: "Carlos Silva",
            detalhe: "carlos@email.com",
            status: "Cliente"
        },
        {
            id: 2,
            nome: "Ana Souza",
            detalhe: "ana@email.com",
            status: "Cliente"
        }
    ]
}));
// Exibe a página /admin/medicamentos.
router.get("/admin/medicamentos", requerAdmin, (req, res) => res.render("pages/admin-lista", {
    titulo: "Medicamentos",
    tipo: "medicamentos",
    itens: medicamentos.map(m => ({
        id: m.id,
        nome: m.nome,
        detalhe: m.categoria,
        status: `R$ ${m.menorPreco.toFixed(2).replace(".", ",")}`
    }))
}));
// Exibe a página /admin/farmacias.
router.get("/admin/farmacias", requerAdmin, (req, res) => res.render("pages/admin-lista", {
    titulo: "Farmácias",
    tipo: "farmacias",
    itens: farmacias.map(f => ({
        id: f.id,
        nome: f.nome,
        detalhe: f.cidade,
        status: "Ativa"
    }))
}));
// Exibe a página /admin/categorias.
router.get("/admin/categorias", requerAdmin, (req, res) => res.render("pages/admin-lista", {
    titulo: "Categorias",
    tipo: "categorias",
    itens: categorias.map((c, i) => ({
        id: i + 1,
        nome: c.nome,
        detalhe: c.descricao,
        status: "Ativa"
    }))
}));
// Exibe a página /admin/relatorios.
router.get("/admin/relatorios", requerAdmin, (req, res) => res.render("pages/admin-simples", {
    titulo: "Relatórios",
    texto: "Acompanhe as pesquisas e os preços mais consultados na plataforma."
}));
// Exibe a página /admin/configuracoes.
router.get("/admin/configuracoes", requerAdmin, (req, res) => res.render("pages/admin-simples", {
    titulo: "Configurações",
    texto: "Área reservada para preferências gerais do BioClicky."
}));
// Recebe o formulário de /admin/logout.
router.post("/admin/logout", (req, res) => {
    delete req.session.adminId;
    delete req.session.adminNome;
    res.redirect("/admin");
});

// Entrega as rotas para que app.js as utilize.
module.exports = router;
