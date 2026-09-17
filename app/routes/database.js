const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bioclicky"
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar:", err);
        return;
    }

    console.log("MySQL conectado");

    db.query(`
        CREATE TABLE IF NOT EXISTS administrador (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            senha VARCHAR(255) NOT NULL
        )
    `);

    db.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            senha VARCHAR(255) NOT NULL
        )
    `);

    db.query(
        "SELECT * FROM administrador WHERE email = ?",
        ["Bioclicky@admin.com"],
        async (err, results) => {
            if (err) return console.log(err);

            if (results.length === 0) {
                const senhaCriptografada = await bcrypt.hash("admin123", 10);

                db.query(
                    "INSERT INTO administrador (nome, email, senha) VALUES (?, ?, ?)",
                    [
                        "Admin BioClicky",
                        "Bioclicky@admin.com",
                        senhaCriptografada
                    ]
                );

                console.log("Administrador criado.");
            }
        }
    );
});

module.exports = db;