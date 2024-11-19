// Add all elements and buttons to the page
const cells = document.querySelectorAll(".grid-cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const gameOver = document.querySelector(".game-over-text");
const restartBtn = document.querySelector(".restartBtn");

const winConditions = [
  //rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //column
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false;


initializeGame();

function initializeGame() {
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
};

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] !== '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
/*     changePlayer(); */
    checkWinner();
 };

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
 };

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
/*     statusText.textContent = `${currentPlayer}'s turn`; */
};

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameOver.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if(!options.includes("")) {
        gameOver.textContent = "Draw";
        running = false;
    } else {
        changePlayer();
    }
 };

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    /*   statusText.textContent = `${currentPlayer}'s turns!`; */
    cells.forEach(cell => cell.textContent = "");
    running = true;
    gameOver.textContent = "";
 };
