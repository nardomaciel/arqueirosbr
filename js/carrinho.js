// Carrinho salvo no navegador. Cada item é { id, qtd }.
const CHAVE_CARRINHO = "arquearia-carrinho";

function lerCarrinho() {
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));
        return Array.isArray(salvo) ? salvo.filter(function (item) { return buscarProduto(item.id); }) : [];
    } catch (erro) {
        return [];
    }
}

function salvarCarrinho(itens) {
    try {
        localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
    } catch (erro) {
        // sem armazenamento (aba anônima, por exemplo): o carrinho vale só enquanto a página está aberta
    }
    atualizarContador();
    desenharGaveta();
    document.dispatchEvent(new CustomEvent("carrinho-mudou"));
}

let carrinhoAtual = lerCarrinho();

function itensDoCarrinho() {
    return carrinhoAtual;
}

function adicionarAoCarrinho(id, qtd) {
    const item = carrinhoAtual.find(function (i) { return i.id === id; });
    if (item) {
        item.qtd += qtd;
    } else {
        carrinhoAtual.push({ id: id, qtd: qtd });
    }
    salvarCarrinho(carrinhoAtual);
}

function mudarQuantidade(id, qtd) {
    if (qtd < 1) {
        carrinhoAtual = carrinhoAtual.filter(function (i) { return i.id !== id; });
    } else {
        carrinhoAtual.forEach(function (i) { if (i.id === id) i.qtd = qtd; });
    }
    salvarCarrinho(carrinhoAtual);
}

function esvaziarCarrinho() {
    carrinhoAtual = [];
    salvarCarrinho(carrinhoAtual);
}

function totalDoCarrinho() {
    return carrinhoAtual.reduce(function (soma, item) {
        return soma + buscarProduto(item.id).preco * item.qtd;
    }, 0);
}

function quantidadeTotal() {
    return carrinhoAtual.reduce(function (soma, item) { return soma + item.qtd; }, 0);
}

// ---------- cabeçalho ----------

function atualizarContador() {
    document.querySelectorAll("[data-contador]").forEach(function (el) {
        const qtd = quantidadeTotal();
        el.textContent = qtd;
        el.hidden = qtd === 0;
    });
}

// ---------- gaveta lateral ----------

function abrirGaveta() {
    document.body.classList.add("gaveta-aberta");
    document.getElementById("gaveta").setAttribute("aria-hidden", "false");
}

function fecharGaveta() {
    document.body.classList.remove("gaveta-aberta");
    document.getElementById("gaveta").setAttribute("aria-hidden", "true");
}

function linhaDoItem(item) {
    const p = buscarProduto(item.id);
    return `
        <li class="item-carrinho">
            <img src="${p.imagem}" alt="">
            <div>
                <a href="produto.html?id=${p.id}">${p.nome}</a>
                <span class="item-preco">${formatarPreco(p.preco)}</span>
                <div class="quantidade">
                    <button type="button" data-menos="${p.id}" aria-label="diminuir">−</button>
                    <span>${item.qtd}</span>
                    <button type="button" data-mais="${p.id}" aria-label="aumentar">+</button>
                </div>
            </div>
            <button type="button" class="remover" data-remover="${p.id}" aria-label="remover ${p.nome}">remover</button>
        </li>`;
}

function desenharGaveta() {
    const lista = document.getElementById("gaveta-itens");
    if (!lista) return;
    const vazio = carrinhoAtual.length === 0;
    lista.innerHTML = vazio
        ? '<li class="carrinho-vazio">Seu carrinho está vazio.<br><a href="loja.html">Ver a loja</a></li>'
        : carrinhoAtual.map(linhaDoItem).join("");
    document.getElementById("gaveta-total").textContent = formatarPreco(totalDoCarrinho());
    document.getElementById("gaveta-rodape").hidden = vazio;
}

// cliques nos botões de quantidade (na gaveta e na página do carrinho)
document.addEventListener("click", function (evento) {
    const alvo = evento.target;
    if (alvo.dataset.mais) {
        const item = carrinhoAtual.find(function (i) { return i.id === alvo.dataset.mais; });
        mudarQuantidade(item.id, item.qtd + 1);
    } else if (alvo.dataset.menos) {
        const item = carrinhoAtual.find(function (i) { return i.id === alvo.dataset.menos; });
        mudarQuantidade(item.id, item.qtd - 1);
    } else if (alvo.dataset.remover) {
        mudarQuantidade(alvo.dataset.remover, 0);
    } else if (alvo.closest("[data-abrir-carrinho]")) {
        abrirGaveta();
    } else if (alvo.closest("[data-fechar-carrinho]")) {
        fecharGaveta();
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") fecharGaveta();
});

// botão "adicionar" em qualquer card de produto
function ligarBotoesComprar(raiz) {
    raiz.querySelectorAll("[data-comprar]").forEach(function (botao) {
        botao.addEventListener("click", function () {
            adicionarAoCarrinho(botao.dataset.comprar, 1);
            abrirGaveta();
        });
    });
}

function cardDoProduto(p) {
    return `
        <article class="card-produto">
            <a class="card-foto" href="produto.html?id=${p.id}">
                <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
            </a>
            <div class="card-corpo">
                <span class="card-categoria">${CATEGORIAS[p.categoria]}</span>
                <h3><a href="produto.html?id=${p.id}">${p.nome}</a></h3>
                <p>${p.resumo}</p>
                <div class="card-rodape">
                    <strong class="preco">${formatarPreco(p.preco)}</strong>
                    <button type="button" class="botao botao-pequeno" data-comprar="${p.id}">adicionar</button>
                </div>
            </div>
        </article>`;
}

// menu no celular
document.addEventListener("click", function (evento) {
    if (evento.target.closest("[data-menu]")) {
        document.body.classList.toggle("menu-aberto");
    }
});

atualizarContador();
desenharGaveta();
