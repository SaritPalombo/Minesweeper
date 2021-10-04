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
            boardRow.push({ value: 0, isShown: false })

        }
        gBoard.push(boardRow)
    }

    var randomMines = getRandomMines(gMinesCount)
    for (var i = 0; i < randomMines.length; i++) {
        var mineLocation = randomMines[i]
        gBoard[mineLocation.i][mineLocation.j] = { value: MINE_CELL, isShown: false }
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
            row += gBoard[i][j].value + " "
        }
        console.log(row)
    }
}

function setMinesNegsCount(iCell, jCell) {
    var count = 0
    var neighbors = 0
    for (var i = iCell - 1; i <= iCell + 1; i++) {
        if (i < 0 || i >= gLevelSizeBoard) continue
        for (var j = jCell - 1; j <= jCell + 1; j++) {
            if (j < 0 || j >= gLevelSizeBoard) continue
            if (i === iCell && j === jCell) continue

            if (gBoard[i][j].value === MINE_CELL) neighbors++
        }
    }
    // console.log(count)
    console.log(neighbors)
    if (neighbors !== 0) {
        gBoard[iCell][jCell] = { value: neighbors, isShown: false }
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

function cellClicked(elCell, i, j) {
    console.log(elCell, i, j)
    if (gBoard[i][j].value !== MINE_CELL) {
        gBoard[i][j].isShown = true
        renderBoard()
    }
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
            > ${cell.isShown ? cell.value : ""} </td>`;
        }
        strHtml += '</tr>'
    }
    boardElement.innerHTML = strHtml
}