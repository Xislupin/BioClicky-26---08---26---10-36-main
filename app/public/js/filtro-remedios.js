const listaRemedios = document.querySelector('.lista-remedios');

document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('searchInput');
    const chips = document.querySelectorAll('.categorias-filtro .chip');
    const cards = document.querySelectorAll('.lista-remedios .remedio-card');

    let categoriaAtiva = 'Todos';
    let termoBusca = '';

    // Função para filtrar os remédios
    function filtrarRemedios() {

        let encontrou = false;

        cards.forEach(card => {

            const nome = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const descricao = card.querySelector('.remedio-info small')?.textContent.toLowerCase() || '';

            // Verifica se o texto digitado bate com nome ou descrição
            const correspondeBusca =
                nome.includes(termoBusca) ||
                descricao.includes(termoBusca);

            // Verifica a categoria
            let correspondeCategoria = true;

            if (categoriaAtiva !== 'Todos') {

                const catLower = categoriaAtiva.toLowerCase();

                correspondeCategoria =
                    nome.includes(catLower) ||
                    descricao.includes(catLower);
            }

            // Mostra ou esconde o card
            if (correspondeBusca && correspondeCategoria) {

                card.style.display = 'flex';
                encontrou = true;

            } else {

                card.style.display = 'none';
            }
        });

        // Remove mensagem anterior
        const mensagemAnterior = listaRemedios.querySelector('.nenhum-remedio');

        if (mensagemAnterior) {
            mensagemAnterior.remove();
        }

        // Se nenhum remédio foi encontrado
        if (!encontrou) {

            const p = document.createElement('p');

            p.classList.add('nenhum-remedio');
            p.textContent = 'Nenhum remédio encontrado.';

            p.style.fontSize = '2rem';
            p.style.textAlign = 'center';

            listaRemedios.appendChild(p);
        }
    }

    // Evento de digitação na barra de busca
    if (searchInput) {

        searchInput.addEventListener('input', (e) => {

            termoBusca = e.target.value.trim().toLowerCase();

            filtrarRemedios();
        });
    }

    // Evento de clique nos chips de categoria
    chips.forEach(chip => {

        chip.addEventListener('click', () => {

            // Remove ativo de todos
            chips.forEach(c => c.classList.remove('ativo'));

            // Ativa o clicado
            chip.classList.add('ativo');

            categoriaAtiva = chip.textContent.trim();

            filtrarRemedios();
        });
    });

});