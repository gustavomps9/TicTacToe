const cell = document.querySelectorAll('.cell');
const board = document.querySelector('#board');
const status = document.querySelector('#status');
const reset = document.querySelector('#reset');
const xClass = 'X';
const oClass = 'O';

let playerXName = '';
let playerOName = '';

let xTurn;

// Definição das combinações vencedoras
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

reset.addEventListener('click', startGame);

// Função que inicia o jogo
function startGame() {
    // Pede o nome dos jogadores
    playerXName = prompt('Digite o nome do jogador X:') || 'Jogador X';
    playerOName = prompt('Digite o nome do jogador O:') || 'Jogador O';

    // Define que o jogador X é o primeiro a jogar
    xTurn = true;

    cell.forEach(cell => {
        // Limpa as classes e o texto de cada quadrado
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.classList.remove('winning-cell');
        cell.innerText = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });

    setBoardHoverClass();

    // Define a mensagem de status inicial
    setStatusText(`${playerXName} é o próximo`);
}

// Função chamada quando uma posição é clicada, realiza a jogada e verifica o estado do jogo
function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? xClass : oClass;

    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        setStatusText(`${xTurn ? playerXName : playerOName} é o próximo`);
    }
}

// Função que coloca o respetivo símbolo (X ou O) no quadrado
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass;
}

// Função que troca o jogador atual
function swapTurns() {
    xTurn = !xTurn;
}

// Função que adiciona a classe de hover no tabuleiro
function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(oClass);

    if (xTurn) {
        board.classList.add(xClass);
    } else {
        board.classList.add(oClass);
    }
}

// Função que verifica se o jogador atual venceu
function checkWin(currentClass) {
    const winningCombo = winningCombination.find(combination => {
        return combination.every(index => {
            return cell[index].classList.contains(currentClass);
        });
    });

    if (winningCombo) {
        winningCombo.forEach(index => {
            cell[index].classList.add('winning-cell');
        });
        return true;
    }

    return false;
}

// Função que verifica se o jogo terminou empatado
function isDraw() {
    return [...cell].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    });
}

// Função que finaliza o jogo
function endGame(draw) {
    if (draw) {
        setStatusText('O jogo terminou empatado!');
    } else {
        setStatusText(`Parabéns ${xTurn ? playerXName : playerOName}! Foi o grande vencedor!`);
    }
    cell.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

// Função que define o texto do status
function setStatusText(message) {
    status.innerText = message;
}
