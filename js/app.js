gBoard = null;
gLevels = [
  { SIZE: 4, MINES: 2 },
  { SIZE: 8, MINES: 12 },
  { SIZE: 12, MINES: 30 },
];
gGame = {
  isOn: false,
  isFinished: false,
  level: 0,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  lives: 3,
};
timer = null;

MINE_VALUE = '💣';
MARKED_VALUE = '🚩';

function initGame() {
  gGame.isOn = false;
  gGame.isFinished = false;
  gGame.shownCount = 0;
  gGame.secsPassed = 0;
  gGame.markedCount = 0;
  gGame.lives = 3;
  clearInterval(timer);

  var boardSize = getBoardSize();
  var minesCount = getBoardMinesCount();

  gBoard = [];
  for (var i = 0; i < boardSize; i++) {
    var boardRow = [];
    for (var j = 0; j < boardSize; j++) {
      boardRow.push(createBoardCell(0));
    }
    gBoard.push(boardRow);
  }

  var randomMines = getRandomMines(minesCount);
  console.log('randomMines', randomMines);
  for (var i = 0; i < randomMines.length; i++) {
    var mineLocation = randomMines[i];
    gBoard[mineLocation.i][mineLocation.j] = createBoardCell(MINE_VALUE);
  }

  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (gBoard[i][j].value !== MINE_VALUE) setMinesNegsCount(i, j);
    }
  }

  consoleLogBoard();
  renderBoard();
  renderMinesLeft();
  renderLives();
  renderTime();
  renderSmily("😃");
}

function createBoardCell(value) {
  return { value: value, isShown: false, isMarked: false };
}

function setMinesNegsCount(iCell, jCell) {
  var boardSize = getBoardSize();

  var neighbors = 0;
  for (var i = iCell - 1; i <= iCell + 1; i++) {
    if (i < 0 || i >= boardSize) continue;
    for (var j = jCell - 1; j <= jCell + 1; j++) {
      if (j < 0 || j >= boardSize) continue;
      if (i === iCell && j === jCell) continue;
      if (gBoard[i][j].value === MINE_VALUE) neighbors++;
    }
  }
  console.log(neighbors)
  if (neighbors > 0) gBoard[iCell][jCell] = createBoardCell(neighbors);
}

function onChangeLevel(level) {
  console.log("level", level);
  gGame.level = level;
  initGame();
}

function startGame() {
  if (gGame.isOn) return;

  gGame.isOn = true;
  timer = setInterval(function () {
    gGame.secsPassed += 1;
    renderTime();
  }, 1000);
}

function rightCellClick(event, elCell, i, j) {
  // console.log("rightCellClick", elCell, i, j)
  if (gGame.isFinished) return;

  startGame();
  event.preventDefault();

  var cell = gBoard[i][j];
  if (cell.isShown) return;
  if (cell.isMarked) {
    cell.isMarked = false;
    gGame.markedCount--;
  } else {
    if (gGame.markedCount == getBoardMinesCount()) return;
    cell.isMarked = true;
    gGame.markedCount++;
  }

  checkGameOver();
  renderMinesLeft();
  renderBoard();
}

function leftCellClick(event, elCell, i, j) {
  // console.log("leftCellClick", elCell, i, j)

  if (gGame.isFinished) return;

  startGame();

  if (gGame.shownCount === 0 && gBoard[i][j].value === MINE_VALUE) return;
  if (gBoard[i][j].isShown) return;

  gGame.shownCount++;
  gBoard[i][j].isShown = true;

  if (gBoard[i][j].value === MINE_VALUE) {
    gGame.lives--;
    renderLives();
  } else if (gBoard[i][j].value === 0) {
    expandShown(i, j);
  }

  checkGameOver();
  renderBoard();
}

function finishGame(smily) {
  gGame.isOn = false;
  gGame.isFinished = true;
  clearInterval(timer);
  renderSmily(smily);
}
function checkGameOver() {
  if (gGame.lives === 0) {
    finishGame('🤯');
  } else if (gGame.shownCount >= getBoardSize() ** 2 - getBoardMinesCount()) {
    finishGame('😎');
  }
}

function expandShown(iCell, jCell) {
  var boardSize = getBoardSize();

  for (var i = iCell - 1; i <= iCell + 1; i++) {
    if (i < 0 || i >= boardSize) continue;
    for (var j = jCell - 1; j <= jCell + 1; j++) {
      if (j < 0 || j >= boardSize) continue;
      if (i === iCell && j === jCell) continue;
      if (gBoard[i][j].value !== MINE_VALUE && gBoard[i][j].isShown === false) {
        gBoard[i][j].isShown = true;
        gGame.shownCount++;
      }
    }
  }
}

function renderBoard() {
  var boardSize = getBoardSize();
  var boardElement = document.getElementById('table');
  var strHtml = '';

  for (var i = 0; i < boardSize; i++) {
    strHtml += '<tr>';
    for (var j = 0; j < boardSize; j++) {
      var cell = gBoard[i][j];
      // console.log(cell)
      var value = '';
      if (gGame.isFinished && cell.value === MINE_VALUE) value = MINE_VALUE;
      else if (cell.isShown && cell.value !== 0) value = cell.value;
      else if (cell.isMarked) value = MARKED_VALUE;

      var className = cell.isShown ? 'shown' : '';
      strHtml += `<td class="${className}"
            data-i="${i}" 
            data-j="${j}" 
            oncontextmenu="rightCellClick(event,this,${i}, ${j})"
            onclick="leftCellClick(event,this,${i}, ${j})"
            > ${value} </td>`;
    }
    strHtml += "</tr>";
    console.table()
  }
  boardElement.innerHTML = strHtml;

}

function renderMinesLeft() {
  document.querySelector('.mines-left-container').innerText = `💥Mines Left:\n${getBoardMinesCount() - gGame.markedCount}`;
}

function renderLives() {
  document.querySelector('.lives-container').innerText = `♥️Lives:\n${gGame.lives}`;
}

function renderTime() {
  document.querySelector('.time-container').innerText = `⏳Time:\n${gGame.secsPassed}`;
}

function renderSmily(value) {
  document.querySelector('.restart').innerText = value;
}
