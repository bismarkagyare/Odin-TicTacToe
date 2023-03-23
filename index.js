const Gameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    const boardContainer = document.querySelector('.gameboard');
    boardContainer.innerHTML = gameboard.map((box, index) =>
      `<div class="box grid-cell" id="${index}">${box}</div>`
    ).join('');
    document.querySelector('.container').hidden = true;
    boardContainer.classList.remove('hidden');
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
      box.addEventListener('click', gameLogic.handleClick);
    });
  };
  
  const createGrid = () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, i) => {
      box.classList.add('grid-cell');
      if (i < 3) {
        box.classList.add('border-top');
      }
      if (i % 3 === 0) {
        box.classList.add('border-left');
      }
      if (i % 3 === 2) {
        box.classList.add('border-right');
      }
      if (i > 5) {
        box.classList.add('border-bottom');
      }
    });
  };

  const updateSign = (index, value) => {
    gameboard[index] = value;
    render();
  }

  const getGameboard = () => gameboard;

  return {render, createGrid, updateSign, getGameboard};
})();

const createPlayer = (name, sign) => {
  return {name, sign};
}

const displayWinnerMessage = (() => {
  const renderMessage = (message) => {
    document.querySelector('.win-message').innerHTML = message;
  }

  return {renderMessage};
})();

// game logic reside here
const gameLogic = (() => {
  let players = [];
  let gameOver;
  let currentPlayerIndex;

  const start = () => {
    players = [
      createPlayer(document.getElementById('player1').value, 'X'),
      createPlayer(document.getElementById('player2').value, 'O')
    ];
    gameOver = false;
    currentPlayerIndex = 0;
    Gameboard.render();
    Gameboard.createGrid();
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
      box.addEventListener('click', handleClick);
    });
  }

  const handleClick = (e) => {
    if (gameOver) return;
    const index = +e.target.id;
    if (Gameboard.getGameboard()[index] !== '') return;
    Gameboard.updateSign(index, players[currentPlayerIndex].sign);
    Gameboard.createGrid();

    //check for win 
    if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)){
      gameOver = true;
      displayWinnerMessage.renderMessage(`${players[currentPlayerIndex].name} wins the round!`);
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayWinnerMessage.renderMessage(`its a tie`);
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

    if (gameOver) {
      document.getElementById('restart-button').classList.remove('hidden');
    }
  }

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.updateSign(i, '');
    }
    Gameboard.render();
    gameOver = false;
    document.querySelector('.win-message').innerHTML = '';
  }

  return {start, handleClick, restart};
})();

const checkForWin = (board) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

const checkForTie = (board) => {
  return board.every(cell => cell !== '');
}

function validateForm() {
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;

  if (player1 == "" || player2 == "") {
    alert("Please fill in all fields.");
    return false;
  }
}

const startBtn = document.getElementById('start-button');
startBtn.addEventListener('click', () => {
  gameLogic.start();
});

const restartBtn = document.getElementById('restart-button');
restartBtn.addEventListener('click', () => {
  gameLogic.restart();
  Gameboard.createGrid();
})