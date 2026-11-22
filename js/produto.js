// Página de um produto: produto.html?id=arco-recurvo
const id = new URLSearchParams(location.search).get("id");
const produto = buscarProduto(id);
const area = document.getElementById("produto");

if (!produto) {
    area.innerHTML = `
        <div>
            <h1>Produto não encontrado</h1>
            <p>Ele pode ter saído da loja. <a href="loja.html">Ver todos os produtos</a></p>
        </div>`;
} else {
    document.title = produto.nome + " · Arquearia Brasil";

    const ficha = Object.keys(produto.detalhes).map(function (chave) {
        return `<tr><th>${chave}</th><td>${produto.detalhes[chave]}</td></tr>`;
    }).join("");

    const parcelas = produto.preco >= 300
        ? "ou 3x de " + formatarPreco(produto.preco / 3) + " sem juros"
        : "pagamento na retirada";

    const ehServico = produto.categoria === "servicos";

    area.innerHTML = `
        <div class="produto-foto">
            <img src="${produto.imagem}" alt="${produto.nome}">
        </div>
        <div>
            <p class="trilha">
                <a href="loja.html">Loja</a> /
                <a href="loja.html?categoria=${produto.categoria}">${CATEGORIAS[produto.categoria]}</a>
            </p>
            <h1>${produto.nome}</h1>
            <p class="produto-preco">${formatarPreco(produto.preco)}</p>
            <p class="parcelas">${parcelas}</p>
            <p>${produto.resumo}</p>
            <p>${produto.descricao}</p>
            <div class="comprar">
                <input id="qtd" type="number" min="1" max="20" value="1" aria-label="quantidade">
                <button class="botao" type="button" id="adicionar">${ehServico ? "Reservar" : "Adicionar ao carrinho"}</button>
            </div>
            <table class="ficha">${ficha}</table>
            <p class="aviso-retirada">${ehServico
                ? "Depois do pedido, entramos em contato para combinar o dia e o horário."
                : "Retirando no clube, um instrutor confere e ajusta o equipamento com você, sem custo."}</p>
        </div>`;

    document.getElementById("adicionar").addEventListener("click", function () {
        const qtd = Math.max(1, Math.min(20, parseInt(document.getElementById("qtd").value, 10) || 1));
        adicionarAoCarrinho(produto.id, qtd);
        abrirGaveta();
    });

    // relacionados: mesma categoria primeiro, depois o resto
    const relacionados = PRODUTOS
        .filter(function (p) { return p.id !== produto.id; })
        .sort(function (a, b) {
            return (b.categoria === produto.categoria) - (a.categoria === produto.categoria);
        })
        .slice(0, 4);
    const grade = document.getElementById("relacionados");
    grade.innerHTML = relacionados.map(cardDoProduto).join("");
    ligarBotoesComprar(grade);
}
