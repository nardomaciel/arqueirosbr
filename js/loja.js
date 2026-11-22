// Página da loja: filtro por categoria e ordenação.
const filtros = document.getElementById("filtros");
const grade = document.getElementById("grade");
const ordem = document.getElementById("ordem");
const resultado = document.getElementById("resultado");

// a categoria pode vir na URL: loja.html?categoria=arcos
let categoriaAtual = new URLSearchParams(location.search).get("categoria") || "todas";
if (categoriaAtual !== "todas" && !CATEGORIAS[categoriaAtual]) categoriaAtual = "todas";

function desenharFiltros() {
    const opcoes = Object.assign({ todas: "Todos" }, CATEGORIAS);
    filtros.innerHTML = Object.keys(opcoes).map(function (chave) {
        const ativo = chave === categoriaAtual ? " ativo" : "";
        return `<button type="button" class="filtro${ativo}" data-categoria="${chave}">${opcoes[chave]}</button>`;
    }).join("");
}

function desenharProdutos() {
    let lista = PRODUTOS.filter(function (p) {
        return categoriaAtual === "todas" || p.categoria === categoriaAtual;
    });

    if (ordem.value === "menor") lista = lista.slice().sort(function (a, b) { return a.preco - b.preco; });
    if (ordem.value === "maior") lista = lista.slice().sort(function (a, b) { return b.preco - a.preco; });
    if (ordem.value === "nome") lista = lista.slice().sort(function (a, b) { return a.nome.localeCompare(b.nome, "pt-BR"); });

    resultado.textContent = lista.length + (lista.length === 1 ? " produto" : " produtos");
    grade.innerHTML = lista.map(cardDoProduto).join("");
    ligarBotoesComprar(grade);
}

filtros.addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-categoria]");
    if (!botao) return;
    categoriaAtual = botao.dataset.categoria;
    const url = categoriaAtual === "todas" ? "loja.html" : "loja.html?categoria=" + categoriaAtual;
    history.replaceState(null, "", url);
    desenharFiltros();
    desenharProdutos();
});

ordem.addEventListener("change", desenharProdutos);

desenharFiltros();
desenharProdutos();
