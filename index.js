const Gameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    let boardHTML = '';
    gameboard.forEach((box, index) => {
      boardHTML += `<div class="box grid-cell" id="${index}">${box}</div>`;
    });
    document.querySelector('.gameboard').innerHTML = boardHTML;
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.gameboard').classList.remove('hidden');
  }

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
