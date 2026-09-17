const express = require("express");

const router = express.Router();

// Disponibiliza informações do usuário para todas as páginas
router.use((req, res, next) => {
    res.locals.logado = !!req.session.usuarioId;
    res.locals.usuario = req.session.usuarioNome || null;
    next();
});

// 🔒 MIDDLEWARE DE SEGURANÇA
function requerLogin(req, res, next) {
    if (req.session && req.session.usuarioId) {
        return next();
    }
    res.redirect("/login");
}

// ==================== ROTAS PÚBLICAS ====================

router.get("/", (req, res) => {
    res.render("pages/home", {
        remedio: null,
        cidade: "São Paulo - SP",
        farmacias: []
    });
});

router.get("/login", (req, res) => {

    if (req.session.usuarioId) {
        return res.redirect("/");
    }

    res.render("pages/login", {
        erro: null
    });

});

router.get("/cadastro", (req, res) => {

    if (req.session.usuarioId) {
        return res.redirect("/");
    }

    res.render("pages/cadastro", {
        erro: null
    });

});

router.get("/senha", (req, res) => {
    res.render("pages/senha");
});

router.get("/sobre", (req, res) => {
    res.render("pages/sobre");
});

// ==================== LOGIN USUÁRIO ====================

router.post("/login", (req, res) => {

    const { email, senha } = req.body;

    if (email && senha) {

        // Salva os dados do usuário na sessão
        req.session.usuarioId = 1;
        req.session.usuarioNome = email.split("@")[0];
        req.session.usuarioEmail = email;

        // Mostra o login no terminal
        console.log("=================================");
        console.log("LOGIN REALIZADO");
        console.log("E-mail:", email);
        console.log("Nome:", req.session.usuarioNome);
        console.log("=================================");

        return res.redirect("/remedios");
    }

    res.render("pages/login", {
        erro: "Preencha todos os campos."
    });

});

// ==================== CADASTRO ====================

router.post("/cadastro", (req, res) => {

    const { nome, email, senha, confirmarSenha } = req.body;

    if (!nome || !email || !senha || !confirmarSenha) {
        return res.render("pages/cadastro", {
            erro: "Preencha todos os campos."
        });
    }

    if (senha !== confirmarSenha) {
        return res.render("pages/cadastro", {
            erro: "As senhas não coincidem."
        });
    }

    req.session.usuarioId = 1;
req.session.usuarioNome = nome;
req.session.usuarioEmail = email;

console.log("=================================");
console.log("CADASTRO REALIZADO");
console.log("Nome:", nome);
console.log("E-mail:", email);
console.log("=================================");

res.redirect("/");

});

// ==================== LOGOUT ====================

router.get("/sair", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

// ==================== ÁREA RESTRITA ====================

router.get("/remedios", requerLogin, (req, res) => {

    const dadosRemedios = [
        {
            id: 101,
            nome: "Dipirona Monoidratada 500mg",
            preco: "R$ 4,50",
            laboratorio: "Medley",
            farmacia: "Drogasil"
        },
        {
            id: 102,
            nome: "Ibuprofeno 600mg",
            preco: "R$ 12,90",
            laboratorio: "EMS",
            farmacia: "Drogaria São Paulo"
        },
        {
            id: 103,
            nome: "Losartana Potássica 50mg",
            preco: "R$ 8,00",
            laboratorio: "Neo Química",
            farmacia: "Ultrafarma"
        }
    ];

    res.render("pages/remedios", {
        remedios: dadosRemedios,
        usuario: req.session.usuarioNome
    });
});

router.get("/farmacias", requerLogin, (req, res) => {

    const { busca, cidade, nota } = req.query;

    let farmacias = [
        {
            nome: "Droga Raia",
            nota: 4.3,
            cidade: "São Paulo",
            endereco: "Rua Augusta, 2200",
            telefone: "(11) 3120-5500",
            parceira: true
        },
        {
            nome: "Drogasil",
            nota: 4.5,
            cidade: "São Paulo",
            endereco: "Avenida Paulista, 1540",
            telefone: "(11) 3254-1234",
            parceira: true
        },
        {
            nome: "Ultrafarma",
            nota: 4.4,
            cidade: "São Paulo",
            endereco: "Rua Vergueiro, 800",
            telefone: "(11) 4002-8922",
            parceira: true
        },
        {
            nome: "Pague Menos",
            nota: 4.2,
            cidade: "Barueri",
            endereco: "Av. Brigadeiro Faria Lima, 1800",
            telefone: "(11) 4004-8000",
            parceira: true
        }
    ];

    if (busca) {
        farmacias = farmacias.filter(f =>
            f.nome.toLowerCase().includes(busca.toLowerCase())
        );
    }

    if (cidade) {
        farmacias = farmacias.filter(f =>
            f.cidade === cidade
        );
    }

    if (nota) {
        farmacias = farmacias.filter(f =>
            f.nota >= Number(nota)
        );
    }

    res.render("pages/farmacias", {
        farmacias,
        usuario: req.session.usuarioNome,
        filtros: {
            busca,
            cidade,
            nota
        }
    });

});

router.get("/categorias", requerLogin, (req, res) => {

    const dadosCategorias = [
        "Analgésicos",
        "Antibióticos",
        "Anti-inflamatórios",
        "Cardiovasculares",
        "Vitaminas"
    ];

    res.render("pages/categorias", {
        categorias: dadosCategorias,
        usuario: req.session.usuarioNome
    });
});

// ==================== ADMIN ====================

// 🔒 MIDDLEWARE DE SEGURANÇA DO ADMIN
function requerAdmin(req, res, next) {

    if (req.session && req.session.adminId) {
        return next();
    }

    return res.redirect("/admin");
}


// ==================== LOGIN ADMIN ====================

router.get("/admin", (req, res) => {

    // Se já estiver logado, vai direto para o dashboard
    if (req.session && req.session.adminId) {
        return res.redirect("/admin/dashboard");
    }

    res.render("pages/admin", {
        erro: null
    });

});


router.post("/admin/login", (req, res) => {

    const { email, senha } = req.body;

    // Login de demonstração
    if (
        email === "admin@bioclicky.com" &&
        senha === "123456"
    ) {

        // Salva o administrador na sessão
        req.session.adminId = 1;
        req.session.adminNome = "Admin";
        req.session.adminEmail = email;

        console.log("=================================");
        console.log("LOGIN ADMIN REALIZADO");
        console.log("E-mail:", email);
        console.log("=================================");

        return res.redirect("/admin/dashboard");
    }

    res.render("pages/admin", {
        erro: "Administrador não encontrado ou senha incorreta."
    });

});


// ==================== DASHBOARD ====================

router.get("/admin/dashboard", requerAdmin, (req, res) => {

    const estatisticas = {
        usuarios: 19421,
        pesquisas: 3284,
        medicamentos: 10482,
        farmacias: 532
    };

    res.render("pages/admin-dashboard", {
        admin: req.session.adminNome,
        estatisticas
    });

});


// ==================== USUÁRIOS ====================

router.get("/admin/usuarios", requerAdmin, (req, res) => {

    const usuarios = [
        {
            id: 1,
            nome: "Carlos Silva",
            email: "carlos@email.com",
            tipo: "Cliente"
        },
        {
            id: 2,
            nome: "Ana Souza",
            email: "ana@farmacia.com",
            tipo: "Farmácia"
        }
    ];

    res.render("pages/admin-usuarios", {
        usuarios,
        admin: req.session.adminNome
    });

});


// ==================== MEDICAMENTOS ====================

router.get("/admin/medicamentos", requerAdmin, (req, res) => {

    const medicamentos = [
        {
            id: 101,
            nome: "Paracetamol 500mg",
            categoria: "Analgésicos",
            preco: "R$ 8,50"
        },
        {
            id: 102,
            nome: "Amoxicilina 500mg",
            categoria: "Antibióticos",
            preco: "R$ 42,00"
        }
    ];

    res.render("pages/admin-medicamentos", {
        medicamentos,
        admin: req.session.adminNome
    });

});


// ==================== FARMÁCIAS ====================

router.get("/admin/farmacias", requerAdmin, (req, res) => {

    const farmacias = [
        {
            id: 1,
            nome: "Drogasil Centro",
            cidade: "São Paulo",
            status: "Ativa"
        },
        {
            id: 2,
            nome: "Drogaria São Paulo",
            cidade: "Barueri",
            status: "Ativa"
        }
    ];

    res.render("pages/admin-farmacias", {
        farmacias,
        admin: req.session.adminNome
    });

});


// ==================== CATEGORIAS ====================

router.get("/admin/categorias", requerAdmin, (req, res) => {

    const categorias = [
        {
            id: 1,
            nome: "Analgésicos",
            total: 45
        },
        {
            id: 2,
            nome: "Antibióticos",
            total: 22
        },
        {
            id: 3,
            nome: "Vitaminas",
            total: 19
        }
    ];

    res.render("pages/admin-categorias", {
        categorias,
        admin: req.session.adminNome
    });

});


// ==================== RELATÓRIOS ====================

router.get("/admin/relatorios", requerAdmin, (req, res) => {

    res.render("pages/admin-relatorios", {
        admin: req.session.adminNome
    });

});


// ==================== CONFIGURAÇÕES ====================

router.get("/admin/configuracoes", requerAdmin, (req, res) => {

    res.render("pages/admin-configuracoes", {
        admin: req.session.adminNome
    });

});


// ==================== LOGOUT ADMIN ====================

router.get("/admin/logout", (req, res) => {

    req.session.adminId = null;
    req.session.adminNome = null;
    req.session.adminEmail = null;

    res.redirect("/admin");

});

// ==================== MEU PERFIL ====================

router.get("/perfil", requerLogin, (req, res) => {
    res.render("pages/perfil", {
        nome: req.session.usuarioNome,
        email: req.session.usuarioEmail,
        telefone: req.session.usuarioTelefone || "",
        localizacao: req.session.usuarioLocalizacao || "São Paulo - SP"
    });
});

router.post("/perfil", requerLogin, (req, res) => {
    const { telefone, localizacao } = req.body;

    req.session.usuarioTelefone = telefone;
    req.session.usuarioLocalizacao = localizacao;

    res.redirect("/perfil");
});

module.exports = router;