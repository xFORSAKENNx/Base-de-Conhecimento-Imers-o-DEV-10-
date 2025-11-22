let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input[type='text']");
let botaoBusca = document.getElementById("botao-busca");
let dados = [];

async function iniciarBusca()
{
    // Se os dados ainda não foram carregados, busca do JSON
    if (dados.length == 0)
    {
        try
        {
            let response = await fetch("data.json");
            dados = await response.json();
        }
        catch(error)
        {
            console.error("Falha ao buscar dados:", error);
            return; // interrompe a execução se houver erro
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();

    const dadosFiltrados = dados.filter(dado =>
        (dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca) ||
        // Converte o ano para string para poder usar o .includes() e busca pela data de criação
        dado.data_criacao.toString().includes(termoBusca))
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados)
{
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    if (dados.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    for (let dado of dados)
    {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <P>${dado.data_criacao}</P>
        <p>${dado.descricao}.</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}

// Adiciona um evento que chama a busca toda vez que o usuário digita algo
campoBusca.addEventListener("input", iniciarBusca);

// Adiciona funcionalidade de limpar ao botão
botaoBusca.addEventListener("click", () => {
    campoBusca.value = "";
    iniciarBusca();
});

// Carrega os dados e exibe todos os cards ao carregar a página
iniciarBusca();