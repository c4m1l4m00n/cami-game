'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

// Quando o jogador 0 tirar o dado 1, troca para o outro jogador 1.
// Função de operador ternário, condition ? expr1 : expr2  se condition for verdadeira retorna expr1, 
// se condition dor falsa retorna expr2.
//Condition é "activePlayer = activePlayer === 0" 
//Explicando a condição: Se o valor do active player é exatamente igual a 0.
//expr1 é 1.
//expr2 é 0.
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    //toggle, vai checar se a classe existe, se ela existi ele irá excluir ela, se ela não existe vai adicionar ela.
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// - O método Math.trunc() retorna a parte inteira de um número, descartando suas casas decimais. 
//(Mdn web docs, acesso 23/08/2022 ás 10:30)
// - Math.random() retorna um número pseudo-aleatório no intervalo [0, 1[, ou seja, 
//de 0 (inclusivo) até, mas não incluindo, 1 (exclusivo), que depois você pode dimensionar 
//para um intervalo desejado. (Mdn web docs, acesso 23/08/2022 ás 10:30)
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        //O Element.classList é uma propriedade somente leitura que retorna uma coleção DOMTokenList
        //ativa dos atributos de classe do elemento.
        //Usar classList é uma alternativa conveniente para acessar a lista de classes de um elemento 
        //como uma seqüência delimitada por espaço através de element.className (Mdn web docs, acesso 23/08/2022 ás 10:30)
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // += Significa igual mais dice, mesma coisa que currentScore = currentScore + dice.
        // Enquanto os dados forem diferentes de 1.
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // Mesma coisa que: scores[1(ou 0)] = scores [1 ou 0] + currentScore 
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
