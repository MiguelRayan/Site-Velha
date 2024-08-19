const currentJogador = document.querySelector(".currentJogador");

let selecionado;
let jogador = "X";

let posicoes = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function inicio(){
    selecionado = [];

    currentJogador.innerHTML = `JOGADOR DA VEZ: ${jogador}`;

    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", novoMov);
    })
}

inicio();

function novoMov(e) {
    const index = e.target.getAttribute("bloco-i");

    e.target.innerHTML = jogador;
    e.target.removeEventListener("click", novoMov);
    selecionado[index] = jogador;

    setTimeout(() => {
        check();
    },  [100]);

    jogador = jogador === "X" ? "O" : "X";
    currentJogador.innerHTML = `JOGADOR DA VEZ: ${jogador}`;
}

function check() {
    let jogadorUltMov = jogador === "X" ? "O" : "X";

    const itens = selecionado
    .map((item, i) => [item, i])
    .filter((item) => item[0] === jogadorUltMov)
    .map((item) => item[1]);

    for(pos of posicoes) {
        if(pos.every((item) => itens.includes(item))) {
            alert("O jogador '" + jogadorUltMov + "' ganhou!");
            inicio();
            return;
        }
    }

    if(selecionado.filter((item) => item).length === 9) {
        alert("Deu velha!");
        inicio();
        return;
    }
}