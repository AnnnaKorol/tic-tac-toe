//*-------------------------------Gameboard -------------------------------//
// Object for the playing field
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]; // Инициализация игрового поля

  const reset = () => {
    board.fill("");                                 // Сброс игрового поля
  };

  const update = (index, player) => {
    if (board[index] === "") {
                                        // Проверка на свободную ячейку
      board[index] = player;            // Обновление ячейки
      return true;                     // Успешное обновление
    }
    return false;                     // Ячейка занята
  };

  const getBoard = () => board;       // Получение текущего состояния игрового поля

  return { reset, update, getBoard };  
})();


//*----------------------------Players creation-------------------------//


// Объект для игроков
const Player = (name, marker) => {
  return { name, marker }; // Создание игрока с именем и маркером
};



//*-------------------------------Game logic-------------------------------//


// Основной объект игры
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

  let players = [Player("Player O", "O"), Player("Player X", "X")]; // Инициализация игроков
  let currentPlayerIndex = 0;               // Индекс текущего игрока
  let playing = false;                     // Флаг игры

  const startGame = () => {
    Gameboard.reset();                    // Сброс поля
    currentPlayerIndex = 0;               // Установка первого игрока
    playing = true;                       // Начало игры
    updatedisplayGame();                            // Отображение
    updateGameOverText("");               // Сброс текста о результате
  };

  const cellClicked = (index) => {
    if (!playing) return;                 // Проверка, идет ли игра

    if (Gameboard.update(index, players[currentPlayerIndex].marker)) {
                                          // Обновление ячейки
      updatedisplayGame();                           // Обновление отображения
      checkWinner();                      // Проверка на победу
    }
  };

  const checkWinner = () => {
    for (const combo of winCombos) {
      // Проверка выигрышных комбинаций
      const [a, b, c] = combo;
      if (
        Gameboard.getBoard()[a] === players[currentPlayerIndex].marker &&
        Gameboard.getBoard()[b] === players[currentPlayerIndex].marker &&
        Gameboard.getBoard()[c] === players[currentPlayerIndex].marker
      ) {
        updateGameOverText(`${players[currentPlayerIndex].name} wins!`); // Объявление победителя
        playing = false; // Остановка игры
        return;
      }
    }

    if (!Gameboard.getBoard().includes("")) {
      // Проверка на ничью
      updateGameOverText("Draw!"); // Сообщение о ничьей
      playing = false; // Остановка игры
    } else {
      currentPlayerIndex = (currentPlayerIndex + 1) % 2; // Смена игрока
    }
  };

    
    
  //Updating the display of the playing field on the screen
  const updatedisplayGame = () => {
    const cells = document.querySelectorAll(".grid-cell"); // getting cells
    const board = Gameboard.getBoard();                    // obtaining board state

    for (let index = 0; index < cells.length; index++) {
      const cell = cells[index];
      cell.textContent = board[index];                       // Updating cell text
      cell.onclick = () => cellClicked(index);               // Click handling
    }
  };

    
    
  const updateGameOverText = (message) => {
    const gameOverText = document.querySelector(".game-over-text"); // Получение элемента для результата
    gameOverText.textContent = message; // Установка текста результата
  };

  return { startGame, restartGame: startGame }; // Возврат методов для управления игрой
})();


//*---------------------------------Game start-----------------------//


// Инициализация игры
document.addEventListener("DOMContentLoaded", () => {
  const restartBtn = document.querySelector(".restartBtn"); // Получение кнопки перезапуска
  restartBtn.onclick = Game.restartGame; // Назначение обработчика клика
  Game.startGame(); // Запуск игры при загрузке страницы
});
