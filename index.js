const Gameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    let boardHTML = '';
    gameboard.forEach((box, index) => {
      boardHTML += `<div class="box" id="box-${index}">${box}</div>`;
    });
    document.getElementById('gameboard').innerHTML = boardHTML;
  }

  return {render};
})();

const createPlayer = (name, sign) => {
  return {name, sign};
}

const startBtn = document.getElementById('start-button');
startBtn.addEventListener('click', () => {
  alert('hi');
});