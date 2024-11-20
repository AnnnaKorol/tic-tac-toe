// Add all elements and buttons to the page
const cells = document.querySelectorAll(".grid-cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const gameOver = document.querySelector(".game-over-text");
const restartBtn = document.querySelector(".restartBtn");


//Win combinations that can be valued as win in this game
const winCombos = [
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

let scenarios = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let playing = false;


startGame();

//!better not to use for Tuta:

/* function startGame() {
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    playing = true;
}; */

//!if index is not important, for a simple enumeration of elements, easy to read, :

/* function startGame() {
    for (const cell of cells) {
        cell.addEventListener("click", cellClicked);
    }
    restartBtn.addEventListener("click", restartGame);
    playing = true;
}; */


//!if index is important, when iteration step control is required (++2), for array-like objects without built-in iteration support: 
function startGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", cellClicked);
    }
    restartBtn.addEventListener("click", restartGame);
    playing = true;
};
    


function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (scenarios[cellIndex] !== '' || !playing) {
        return;
    }

    updateCell(this, cellIndex);
/*     changePlayer(); */
    checkWinner();
 };

function updateCell(cell, index) {
    scenarios[index] = currentPlayer;
    cell.textContent = currentPlayer;
 };

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
/*     statusText.textContent = `${currentPlayer}'s turn`; */
};

function checkWinner() {
    let gameWon = false;

    for (let i = 0; i < winCombos.length; i++) {
        const condition = winCombos[i];
        const cellA = scenarios[condition[0]];
        const cellB = scenarios[condition[1]];
        const cellC = scenarios[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            gameWon = true;
            break;
        }
    }

    if (gameWon) {
        gameOver.textContent = `${currentPlayer} wins!`;
        playing = false;
    } else if(!scenarios.includes("")) {
        gameOver.textContent = "Draw";
        playing = false;
    } else {
        changePlayer();
    }
 };

function restartGame() {
    currentPlayer = "X";
    scenarios = ["", "", "", "", "", "", "", "", ""];
    /*   statusText.textContent = `${currentPlayer}'s turns!`; */
    for (const cell of cells) {
        cell.textContent = "";
    }
    playing = true;
    gameOver.textContent = "";
 };
