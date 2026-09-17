const db = require("./database");
const bcrypt = require("bcrypt");

const email = "Bioclicky@admin.com";
const senha = "admin123";

bcrypt.hash(senha, 10, (err, hash) => {

    db.run(
        "INSERT OR IGNORE INTO administrador (email, senha) VALUES (?, ?)",
        [email, hash],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Administrador criado!");
            }
        }
    );

});