function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

function removeRandomItemFromArray(array) {
    var index = getRandomInt(0, array.length)
    var value = array[index]
    array.splice(index, 1)
    return value
}