document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.searchInput');
    const chips = document.querySelectorAll('.categorias-filtro .chip');
    const cards = document.querySelectorAll('.farmacias-grid .farmacia-card');

    let categoriaAtiva = 'Todos';
    let termoBusca = '';

    // Função para filtrar os remédios com base na busca e na categoria
    function filtrarFarmacias() {
        cards.forEach(card => {
            const nome = card.querySelector('h2').textContent.toLowerCase();
            const descricao = card.querySelector('.farmacia-info p').textContent.toLowerCase();
            
            // Verifica se o texto digitado bate com o nome ou com a descrição
            const correspondeBusca = nome.includes(termoBusca) || descricao.includes(termoBusca);
            
            // Lógica simples para categorias (você pode ajustar conforme os dados reais)
            let correspondeCategoria = true;
            if (categoriaAtiva !== 'Todos') {
                // Exemplo: se o chip for "Febre", verifica se a descrição contém "antitérmico" ou "febre"
                const catLower = categoriaAtiva.toLowerCase();
                correspondeCategoria = nome.includes(catLower) || descricao.includes(catLower);
            }

            // Mostra ou oculta o card dependendo dos filtros
            if (correspondeBusca && correspondeCategoria) {
                card.style.display = 'flex'; // ou 'grid', dependendo do seu CSS
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Evento de digitação na barra de busca
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            termoBusca = e.target.value.trim().toLowerCase();
            filtrarFarmacias();
        });
    }
});