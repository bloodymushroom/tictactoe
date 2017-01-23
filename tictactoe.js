var Board = function() {
  this.field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  console.log(this.field);
}

Board.prototype.hasCol = function() {
  var col = 0;
  var hasWon = false;

  while (col < 3) {
    if (this.field[0][col] && this.field[0][col] === this.field[1][col] && this.field[0][col] === this.field[2][col]) {
      return true; 
    }

    col++;
  }

  return false;
}

Board.prototype.hasRow = function() {
  for (var row = 0; row < 3; row++) {
    if (this.field[row][0] && this.field[row][0] === this.field[row][1] && this.field[row][1] === this.field[row][2]) {
      return true;
    }
  }

  return false;
}

var game = function() {

}

var b1 = new Board();
console.log('row: ', b1.hasRow())
console.log('col: ', b1.hasCol())