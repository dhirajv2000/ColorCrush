let score = 0;
//maintains score of the game
function Score() {}
Score.prototype.scoreCalculate = function (length) {
    score += 10 * length;
    document.getElementById('score').innerHTML = "Score: " + score;
}

Score.prototype.scoreReset = function () {
    score = 0;
    document.getElementById('score').innerHTML = "Score: " + score;
}