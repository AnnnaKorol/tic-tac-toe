//*-------------------------------Gameboard -------------------------------//

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]; // Initialization of the playing field

  const reset = () => {
    board.fill("");                          // Reset the playing field
  };
  //(fill() method allows to fill all array elements with one value);

  const update = (index, player) => {
    if (board[index] === "") {            // Checking for a free cell
      board[index] = player;              // If a cell is free, its value is updated to the value of a player variable (e.g. “X” or “O”).
      return true;                       // Successful update
    }
    return false;                       // Cell occupied
  };

  const getBoard = () => board;         // Getting the current state of the playing field

  return { reset, update, getBoard };
})();


//*----------------------------Players creation-------------------------//

//Player object through "factory function" Player (insted of constructor)
const Player = (name, sign) => {
  return { name, sign }; 
};



//*-------------------------------Game logic-------------------------------//


const Game = (() => {
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


  //default parameters
  let players = [Player("Player O", "O"), Player("Player X", "X")]; // Initializing players
  let currentPlayerIndex = 0;
  let playing = false;                                              // Game flag
/*   const currentPlayerSign = players[currentPlayerIndex].sign;
 */


  const startGame = () => {
    Gameboard.reset();               // Reset field
    currentPlayerIndex = 0;          // Set the first player
    playing = true;                  // Game start
    togglePlayerDisplay(true);       // Show players
    updatedisplayGame();             // Display game
    updateGameOverText("");          // Reset result text
  };



  const cellClicked = (index) => {
    if (!playing) return;            // Check if the game is running

      const currentPlayerSign = players[currentPlayerIndex].sign;

    if (Gameboard.update(index, currentPlayerSign)) {
      // Cell update
      updatedisplayGame();           // Refresh the display
      checkWinner();                 // Check to win
      updatePlayerDisplay(); 
    }
  };



  const checkWinner = () => {

    const currentPlayerSign = players[currentPlayerIndex].sign;

    // Checking winning combinations
    for (const combo of winCombos) {  
      const [a, b, c] = combo; 
      if (
        Gameboard.getBoard()[a] === currentPlayerSign &&
        Gameboard.getBoard()[b] === currentPlayerSign &&
        Gameboard.getBoard()[c] === currentPlayerSign
      ) {
        updateGameOverText(`${players[currentPlayerIndex].name} wins!`); // Announcing the winner
        togglePlayerDisplay(false); // Show players
        playing = false;   

        return;
      }
    }

// Check for a tie
    if (!Gameboard.getBoard().includes("")) {
      updateGameOverText("Draw!");    
      togglePlayerDisplay(false);          
      playing = false;                           // Stop the game
    } else {
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Player change
       updatePlayerDisplay();
    }
  };


  const togglePlayerDisplay = (show) => {
    const playerElements = document.querySelectorAll('.player');
    for (let i = 0; i < playerElements.length; i++) {
      playerElements[i].style.display = show ? 'block' : 'none'; // Устанавливаем видимость

      //style.display : https://www.w3schools.com/cssref/pr_class_display.php
    }
  };


//update the color of player's paragraph
  const updatePlayerDisplay = () => {
    for (let index = 0; index < players.length; index++) {
      const player = players[index];
      const playerElement = document.getElementById(`player${player.sign}`); // search for an element in the DOM with the specified identifier

      if (index === currentPlayerIndex) {
        playerElement.classList.add('active');
        playerElement.classList.remove('inactive');
      } else {
        playerElement.classList.add('inactive');
        playerElement.classList.remove('active');
      }
    }
  };


  //Updating the display of the playing field on the screen
  const updatedisplayGame = () => {
    const cells = document.querySelectorAll(".grid-cell");     // getting cells
    const board = Gameboard.getBoard();                       // obtaining board state

    for (let index = 0; index < cells.length; index++) {
      const cell = cells[index];
      cell.textContent = board[index];                      // Updating cell text
      cell.onclick = () => cellClicked(index);             // Click handling
    }
  };


  // Getting an element for the result
  const updateGameOverText = (message) => {
    const gameOverText = document.querySelector(".game-over-text");   
    gameOverText.textContent = message;                               // Set the result text
  };

  return { startGame, restartGame: startGame }; 
})();


//*---------------------------------Game start-----------------------//

// Game initialization
const initializeGame = () => {
  const restartBtn = document.querySelector(".restartBtn");       // Get the restart button
  restartBtn.onclick = Game.restartGame;                          // Purpose of the click handler
  Game.startGame();                                               // Start the game on page load
};

initializeGame();
