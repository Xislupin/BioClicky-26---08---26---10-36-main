2. Coloque o footer na partial
Crie:
app/views/partials/footer.ejs

E coloque todo o seu footer lá:

 <footer class="footer">
    <section class="footer-container">
        <section>
            <img src="/imagens/logo-header/logo-branca.png"
                 alt="BioClicky"
                 class="footer-logo">
            <p>
                Plataforma para comparação de preços de medicamentos
                em farmácias próximas de você.
            </p>
        </section>
        <section>
            <h3>Navegação</h3>
            <a href="/">Início</a>
            <a href="/remedios">Remédios</a>
            <a href="/farmacias">Farmácias</a>
            <a href="/categorias">Categorias</a>
        </section>
        <section>
            <h3>Institucional</h3>
            <a href="/sobre">Sobre nós</a>
            <a href="#">Termos de uso</a>
            <a href="#">Privacidade</a>
        </section>
        <section>
            <h3>Contato</h3>
            <p>contato@bioclicky.com.br</p>
            <p>(11) 99999-9999</p>
        </section>
    </section
    <section class="footer-bottom">
        © 2026 BioClicky. Todos os direitos reservados.
    </section>
</footer>


3. Na página, você chama a partial

Por exemplo, no sobre.ejs, no final da página:

<%- include('partials/footer') %>

Então o sobre.ejs fica mais ou menos:

<main>
    <section class="sobre-hero">
        <h1>Sobre a BioClicky</h1>
        <p>
            Encontre medicamentos e compare preços
            de forma rápida e fácil.
        </p>
    </section>
    <!-- restante da página -->
</main>


<%- include('partials/footer') %>
4. Faça o mesmo nas outras páginas

index.ejs:

<%- include('partials/footer') %>

remedios.ejs:

<%- include('partials/footer') %>

farmacias.ejs:

<%- include('partials/footer') %>

Assim, você não precisa copiar o footer inteiro para todas as páginas.