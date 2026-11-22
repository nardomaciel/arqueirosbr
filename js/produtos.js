// Catálogo da loja. Cada produto tem um id usado na URL (produto.html?id=...).
const CATEGORIAS = {
    arcos: "Arcos",
    flechas: "Flechas e pontas",
    protecao: "Proteção",
    alvos: "Alvos",
    servicos: "Aulas e aluguel"
};

const PRODUTOS = [
    {
        id: "arco-recurvo",
        nome: "Arco recurvo desmontável 62\"",
        categoria: "arcos",
        preco: 1290,
        imagem: "img/produtos/arco-recurvo.jpg",
        resumo: "O arco do iniciante: desmonta em três partes e as lâminas trocam de libragem conforme você evolui.",
        descricao: "Empunhadura de madeira e lâminas de fibra presas por encaixe, sem ferramenta. É o arco que usamos nas aulas, então você treina em casa com o mesmo equipamento da pista.",
        detalhes: { "Tamanho": "62 polegadas", "Libragem": "20 a 34 lbs (escolha na compra)", "Mão": "destro ou canhoto", "Inclui": "corda e apoio de flecha" }
    },
    {
        id: "arco-composto",
        nome: "Arco composto",
        categoria: "arcos",
        preco: 2490,
        imagem: "img/produtos/arco-composto.jpg",
        resumo: "Polias que aliviam o peso no fim da puxada. Bom para quem quer precisão desde o começo.",
        descricao: "Com as polias, a força para segurar o arco aberto cai bastante, e sobra tempo para mirar com calma. A libragem é regulável, então ele acompanha a sua evolução.",
        detalhes: { "Libragem": "regulável de 40 a 60 lbs", "Abertura": "26 a 30 polegadas", "Inclui": "corda, cabo e descanso de flecha" }
    },
    {
        id: "arco-composto-competicao",
        nome: "Arco composto de competição",
        categoria: "arcos",
        preco: 7900,
        imagem: "img/produtos/arco-composto-competicao.jpg",
        resumo: "Para quem já compete: corpo de alumínio usinado e ajuste fino de polias.",
        descricao: "Arco pensado para provas de 50 m. Aceita mira, estabilizadores e disparador mecânico. A regulagem inicial é feita pelo nosso instrutor na entrega.",
        detalhes: { "Libragem": "50 a 60 lbs", "Corpo": "alumínio usinado", "Regulagem": "inclusa, feita no clube" }
    },
    {
        id: "kit-iniciante",
        nome: "Kit iniciante: arco e seis flechas",
        categoria: "arcos",
        preco: 1590,
        imagem: "img/produtos/kit-iniciante.jpg",
        resumo: "Tudo para começar de uma vez: arco recurvo, seis flechas, dedeira e protetor de braço.",
        descricao: "O mesmo arco recurvo desmontável da loja, com seis flechas cortadas no seu tamanho, dedeira de couro e protetor de braço. As flechas são medidas no clube.",
        detalhes: { "Arco": "recurvo desmontável 62\"", "Flechas": "6 de carbono, cortadas na medida", "Acessórios": "dedeira e protetor de braço" }
    },
    {
        id: "besta",
        nome: "Besta",
        categoria: "arcos",
        preco: 2900,
        imagem: "img/produtos/besta.jpg",
        resumo: "Besta de 100 lbs acompanhada de um conjunto de quatro virotes.",
        descricao: "Para tiro em alvo na pista externa. O uso no clube segue as diretrizes de segurança e só é liberado depois da aula de apresentação.",
        detalhes: { "Força": "100 lbs", "Inclui": "4 virotes e corda reserva", "Uso no clube": "após aula de apresentação" }
    },
    {
        id: "flechas-carbono",
        nome: "Flechas de carbono (6 un.)",
        categoria: "flechas",
        preco: 390,
        imagem: "img/produtos/flechas.jpg",
        resumo: "Seis flechas de carbono com penas plásticas, cortadas no comprimento da sua puxada.",
        descricao: "Leves e retas, aguentam bem os erros do começo. Traga o seu arco e cortamos na medida na hora.",
        detalhes: { "Quantidade": "6 flechas", "Material": "carbono", "Corte": "na medida, feito no clube" }
    },
    {
        id: "ponteiras",
        nome: "Ponteiras de treino (12 un.)",
        categoria: "flechas",
        preco: 89,
        imagem: "img/produtos/ponteiras.jpg",
        resumo: "Ponteiras de aço para treino em alvo, de rosca.",
        descricao: "Ponteiras de rosca para trocar as que se perdem ou entortam no treino. Servem nas flechas de carbono da loja.",
        detalhes: { "Quantidade": "12 ponteiras", "Material": "aço", "Encaixe": "rosca" }
    },
    {
        id: "dedeira",
        nome: "Dedeira de couro",
        categoria: "protecao",
        preco: 79,
        imagem: "img/produtos/dedeira.jpg",
        resumo: "Protege os dedos da corda e deixa a soltura mais limpa.",
        descricao: "Couro duplo, com separador entre os dedos. Substitui a luva para quem atira com arco recurvo.",
        detalhes: { "Material": "couro duplo", "Tamanhos": "P, M e G", "Mão": "destro ou canhoto" }
    },
    {
        id: "protetor-braco",
        nome: "Protetor de braço",
        categoria: "protecao",
        preco: 69,
        imagem: "img/produtos/protetor-braco.jpg",
        resumo: "Evita que a corda bata no antebraço. Obrigatório na pista.",
        descricao: "Plástico rígido com furos de ventilação e duas tiras elásticas. Leve, não esquenta e cabe por cima da manga.",
        detalhes: { "Material": "plástico rígido", "Fixação": "duas tiras elásticas", "Tamanho": "único" }
    },
    {
        id: "aljava",
        nome: "Aljava de couro",
        categoria: "protecao",
        preco: 249,
        imagem: "img/produtos/aljava.jpg",
        resumo: "Aljava de costas, feita à mão, para até 12 flechas.",
        descricao: "Couro curtido com alça regulável. Combina com arco tradicional e tiro de campo.",
        detalhes: { "Capacidade": "até 12 flechas", "Material": "couro", "Uso": "nas costas, alça regulável" }
    },
    {
        id: "face-122",
        nome: "Face de alvo WA 122 cm (10 un.)",
        categoria: "alvos",
        preco: 120,
        imagem: "img/produtos/face-122.jpg",
        resumo: "Face oficial de 10 anéis, usada nas provas de 70 m.",
        descricao: "Papel resistente à água, nas cores oficiais: branco, preto, azul, vermelho e dourado. É a mesma face das provas olímpicas.",
        detalhes: { "Tamanho": "122 cm", "Distância de uso": "60 e 70 m", "Quantidade": "10 faces" }
    },
    {
        id: "face-80",
        nome: "Face de alvo WA 80 cm (10 un.)",
        categoria: "alvos",
        preco: 80,
        imagem: "img/produtos/face-80.jpg",
        resumo: "A face das distâncias médias, de 30 a 50 m.",
        descricao: "Mesmo padrão de cores e anéis da face de 122 cm, em tamanho menor. Ideal para treino em casa e na pista externa.",
        detalhes: { "Tamanho": "80 cm", "Distância de uso": "30 a 50 m", "Quantidade": "10 faces" }
    },
    {
        id: "aula-experimental",
        nome: "Aula experimental",
        categoria: "servicos",
        preco: 60,
        imagem: "img/produtos/aula-experimental.jpg",
        resumo: "Uma hora na pista coberta com instrutor e equipamento incluso.",
        descricao: "Você aprende postura, encaixe da flecha e soltura, e atira já na primeira meia hora. Não precisa trazer nada. Se decidir entrar no clube, o valor é descontado da inscrição.",
        detalhes: { "Duração": "1 hora", "Local": "pista coberta, 18 m", "Equipamento": "incluso" }
    },
    {
        id: "aluguel-dia",
        nome: "Aluguel de equipamento (dia)",
        categoria: "servicos",
        preco: 40,
        imagem: "img/produtos/aluguel.jpg",
        resumo: "Arco, flechas e proteção para um dia de treino, para membros do clube.",
        descricao: "Para quem ainda não tem equipamento próprio ou quer testar outro tipo de arco antes de comprar.",
        detalhes: { "Inclui": "arco, 6 flechas, dedeira e protetor", "Para": "membros do clube", "Retirada": "na recepção" }
    }
];

function buscarProduto(id) {
    return PRODUTOS.find(function (p) { return p.id === id; });
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
