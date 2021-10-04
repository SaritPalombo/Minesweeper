gLevelSizeBoard = 4
gBoard = null
gMinesCount = 2

EMPTY_CELL = "0"
MINE_CELL = "💣"

function initGame() {


    gBoard = []
    for (var i = 0; i < gLevelSizeBoard; i++) {
        var boardRow = []
        for (var j = 0; j < gLevelSizeBoard; j++) {
            boardRow.push({ type: EMPTY_CELL, isShown: false })
        }
        gBoard.push(boardRow)
    }

    var randomMines = getRandomMines(gMinesCount)
    for (var i = 0; i < randomMines.length; i++) {
        var mineLocation = randomMines[i]
        gBoard[mineLocation.i][mineLocation.j] = { type: MINE_CELL, isShown: false }
    }

    for (var i = 0; i < gLevelSizeBoard; i++) {
        for (var j = 0; j < gLevelSizeBoard; j++) {
            setMinesNegsCount(i, j)
        }
    }


    for (var i = 0; i < gLevelSizeBoard; i++) {
        for (var j = 0; j < gLevelSizeBoard; j++) {
            setMinesNegsCount(i, j)
        }
    }
    consoleLogBoard()

    renderBoard()
}

function consoleLogBoard() {
    for (var i = 0; i < gLevelSizeBoard; i++) {
        var row = i + ":  "
        for (var j = 0; j < gLevelSizeBoard; j++) {
            row += gBoard[i][j].type + " "
        }
        console.log(row)
    }
}

function setMinesNegsCount(i, j) {


    var isLeftBorder = j === 0
    var isRightBorder = j === (gLevelSizeBoard - 1)
    var isTopBorder = i === 0
    var isBottonBorder = i === (gLevelSizeBoard - 1)

    var neighbors = 0
    // console.log(i, j, isLeftBorder, isRightBorder, isTopBorder, isBottonBorder)
    if (!isTopBorder && !isLeftBorder && gBoard[i - 1][j - 1] === MINE_CELL) {
        neighbors++
    }
    if (!isTopBorder && gBoard[i - 1][j] === MINE_CELL) {
        neighbors++
    }
    if (!isTopBorder && !isRightBorder && gBoard[i - 1][j + 1] === MINE_CELL) {
        neighbors++
    }
    if (!isLeftBorder && gBoard[i][j - 1] === MINE_CELL) {
        neighbors++
    }
    if (!isRightBorder && !isBottonBorder && gBoard[i + 1][j + 1] === MINE_CELL) {
        neighbors++
    }
    if (!isBottonBorder && gBoard[i + 1][j] === MINE_CELL) {
        neighbors++
    }
    if (!isRightBorder && gBoard[i][j + 1] === MINE_CELL) {
        neighbors++
    }
    if (!isBottonBorder && !isLeftBorder && gBoard[i + 1][j - 1] === MINE_CELL) {
        neighbors++
    }

    console.log(neighbors)
    if (neighbors !== 0) {
        gBoard[i][j] = { type: neighbors, isShown: false }
    }
}

function getRandomMines(minesCount) {
    var randomMinesLocations = []

    var boardLocationsPool = []
    for (var i = 0; i < gLevelSizeBoard; i++) {
        for (var j = 0; j < gLevelSizeBoard; j++) {
            boardLocationsPool.push({ i, j })
        }
    }

    for (var i = 0; i < minesCount; i++) {
        randomMinesLocations.push(removeRandomItemFromArray(boardLocationsPool))
    }

    return randomMinesLocations
}

function restartGame() {

}

function renderBoard() {
    var boardElement = document.getElementById('table')
    var strHtml = '';

    for (var i = 0; i < gLevelSizeBoard; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gLevelSizeBoard; j++) {
            var cell = gBoard[i][j];
            var className = cell.isShown ? 'shown' : '';
            strHtml += `<td class="${className}"
            data-i="${i}" 
            data-j="${j}" 
            onclick="cellClicked(this,${i}, ${j})"
            > ${cell.type} </td>`;
        }
        strHtml += '</tr>'
    }
    boardElement.innerHTML = strHtml
}