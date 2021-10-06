function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function removeRandomItemFromArray(array) {
    var index = getRandomInt(0, array.length);
    var value = array[index];
    array.splice(index, 1);
    return value;
}


function consoleLogBoard() {

    var boardSize = getBoardSize();
    for (var i = 0; i < boardSize; i++) {
        var row = i + ':  ';
        for (var j = 0; j < boardSize; j++) {
            row += gBoard[i][j].value + ' ';
        }
        console.log(row);
    }
}

function getRandomMines(minesCount) {
    var boardSize = getBoardSize();
    var minesCount = getBoardMinesCount();

    var randomMinesLocations = [];

    var boardLocationsPool = [];
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            boardLocationsPool.push({ i, j });
        }
    }
    for (var i = 0; i < minesCount; i++) {
        randomMinesLocations.push(removeRandomItemFromArray(boardLocationsPool));
    }
    return randomMinesLocations;
}

function getBoardMinesCount() {
    return gLevels[gGame.level].MINES;
}

function getBoardSize() {
    return gLevels[gGame.level].SIZE;
}