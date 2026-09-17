# Como usar os arquivos compartilhados

Uma partial é um pedaço de HTML/EJS reutilizado em várias páginas.
O conteúdo não está todo dentro da página inicial: cada página inclui os trechos comuns.

| Arquivo | O que contém |
| --- | --- |
| `head.ejs` | Codificação, configuração da tela, CSS e scripts comuns. |
| `header.ejs` | Logo, menu, botão de entrar e acesso ao perfil. |
| `footer.ejs` | Rodapé das páginas públicas. |
| `admin-nav.ejs` | Menu exclusivo do administrador. |
| `auth-top.ejs` | Logo das telas de acesso. |

Dentro de uma página na pasta `pages`, usamos:

```ejs
<!-- Reutiliza o cabeçalho comum. -->
<%- include('../partials/header') %>

<main>
    <!-- Aqui entra somente o conteúdo específico desta página. -->
    <h1>Sobre o BioClicky</h1>
</main>

<!-- Reutiliza o rodapé comum. -->
<%- include('../partials/footer') %>
```

`..` sobe uma pasta: sai de `pages` e encontra a pasta `partials`.
`include` insere o conteúdo do arquivo durante a montagem da página no servidor.
`<%-` permite inserir o HTML do arquivo compartilhado. Para dados do usuário,
use `<%=`: esse formato escapa caracteres que poderiam ser interpretados como HTML.

Para mudar os links do menu em todas as páginas, edite `header.ejs` uma única vez.
Para mudar apenas a página de remédios, edite `pages/remedios.ejs` e `public/css/remedios.css`.

Os comentários explicam os trechos; não aparecem como texto na tela do site.
