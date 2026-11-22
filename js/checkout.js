// Finalizar pedido: resumo do carrinho, validação e confirmação.
const form = document.getElementById("form-pedido");
const resumoItens = document.getElementById("resumo-itens");
const resumoTotal = document.getElementById("resumo-total");
const camposEndereco = document.getElementById("campos-endereco");
const erro = document.getElementById("erro");
const campos = form.elements;

function desenharResumo() {
    const itens = itensDoCarrinho();
    if (itens.length === 0) {
        document.getElementById("checkout").innerHTML = `
            <div class="confirmacao">
                <span class="aneis" aria-hidden="true"></span>
                <h1>Seu carrinho está vazio</h1>
                <p>Escolha um produto ou agende uma aula experimental.</p>
                <a class="botao" href="loja.html">Ir para a loja</a>
            </div>`;
        return;
    }
    resumoItens.innerHTML = itens.map(function (item) {
        const p = buscarProduto(item.id);
        return `<li><span>${item.qtd}× ${p.nome}</span><span>${formatarPreco(p.preco * item.qtd)}</span></li>`;
    }).join("");
    resumoTotal.textContent = formatarPreco(totalDoCarrinho());
}

form.addEventListener("change", function (evento) {
    if (evento.target.name === "entrega") {
        const entregar = campos.entrega.value === "entrega";
        camposEndereco.hidden = !entregar;
        ["cep", "numero", "endereco"].forEach(function (campo) {
            campos[campo].required = entregar;
        });
    }
});

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!form.checkValidity()) {
        const primeiro = form.querySelector("input:invalid, textarea:invalid, select:invalid");
        erro.textContent = "Confira o campo \"" + form.querySelector('label[for="' + primeiro.id + '"]').textContent + "\".";
        erro.hidden = false;
        primeiro.focus();
        return;
    }

    const codigo = "AB-" + Date.now().toString().slice(-6);
    const primeiroNome = campos.nome.value.trim().split(" ")[0];
    const retirada = campos.entrega.value === "retirada";
    const total = formatarPreco(totalDoCarrinho());

    esvaziarCarrinho();

    const nomeSeguro = document.createElement("span");
    nomeSeguro.textContent = primeiroNome;

    document.getElementById("checkout").innerHTML = `
        <div class="confirmacao">
            <span class="aneis" aria-hidden="true"></span>
            <h1>Pedido recebido, ${nomeSeguro.innerHTML}!</h1>
            <p class="codigo-pedido">${codigo}</p>
            <p>Total de ${total}. ${retirada
                ? "Avisamos quando estiver separado para retirada no clube."
                : "Entramos em contato para combinar o frete."}</p>
            <p class="nota">Este é um site de estudo: o pedido não foi enviado nem cobrado.</p>
            <a class="botao" href="index.html">Voltar ao início</a>
        </div>`;
    window.scrollTo(0, 0);
});

desenharResumo();
document.addEventListener("carrinho-mudou", desenharResumo);
