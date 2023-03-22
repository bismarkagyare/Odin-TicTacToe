const Gameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    const boardContainer = document.querySelector('.gameboard');
    boardContainer.innerHTML = gameboard.map((box, index) =>
      `<div class="box grid-cell" id="${index}">${box}</div>`
    ).join('');
    document.querySelector('.container').hidden = true;
    boardContainer.classList.remove('hidden');
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
  

  return {render, createGrid};
})();

const createPlayer = (name, sign) => {
  return {name, sign};
}

const startBtn = document.getElementById('start-button');
startBtn.addEventListener('click', () => {
  Gameboard.render();
  Gameboard.createGrid();
});
