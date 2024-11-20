// Add all elements and buttons to the page
const cells = document.querySelectorAll(".grid-cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const gameOver = document.querySelector(".game-over-text");
const restartBtn = document.querySelector(".restartBtn");


//Win combinations that can be valued as win in this game
const winCombos = [
  //rows
  [0, 1, 2], //winCombos[0]:first row
  [3, 4, 5], //winCombos[1]:second row
  [6, 7, 8], //winCombos[2]:third row
  //column
  [0, 3, 6], //winCombos[3]:first column
  [1, 4, 7], //winCombos[4]:second column
  [2, 5, 8], //winCombos[5]:third column
  //diagonal
  [0, 4, 8], //winCombos[6]:main diagonal (left to right)
  [2, 4, 6], //winCombos[7]:side diagonal (right to left)
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
    

//if the cell was selected: 
function cellClicked() {
    const cellIndex = this.dataset.cellIndex;
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


//
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
/*     statusText.textContent = `${currentPlayer}'s turn`; */
};



//Winner check in the game
function checkWinner() {
  //check if there was a winning combinations - set a variable:
  let gameWon = false;

  //CHeck all the winning combinations:
  for (let i = 0; i < winCombos.length; i++) {
      const condition = winCombos[i];
      
//Cell values of the current combination:
    const cellA = scenarios[condition[0]];
    const cellB = scenarios[condition[1]];
    const cellC = scenarios[condition[2]];

      //Ignoring empty combinations
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
      }
      
//Checking for equality of cell values if (div1=div2=div3):
    if (cellA == cellB && cellB == cellC) {
      gameWon = true;
      break;
    }
  }

   //Display the result: 
  if (gameWon) {
    gameOver.textContent = `${currentPlayer} wins!`;
      playing = false;

//check if draw:
  } else if (!scenarios.includes("")) {
    gameOver.textContent = "Draw";
    playing = false;
  } else {
    changePlayer();
  }
};


 //Restart button clicked function: 
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
