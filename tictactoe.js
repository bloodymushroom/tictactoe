var readline = require('readline');

var Board = function() {
  this.field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  this.turnO = false;

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

Board.prototype.hasDiagonal = function() {
  if (this.field[0][0] && this.field[0][0] === this.field[1][1] && this.field[1][1] === this.field[2][2]) {
    return true;
  }

  if (this.field[0][2] && this.field[0][2] === this.field[1][1] && this.field[1][1] === this.field[2][0]) {
    return true;
  }

  return false;
}

Board.prototype.hasWinner = function(){

  if (this.hasRow() || this.hasCol() || this.hasDiagonal()) {
    return true;
  }

  return false;
}

Board.prototype.insert = function(x, y, char) {
  if (this.field[x][y] === 0) {
    this.field[x][y] = char;
    console.log(this.field);
    return true;
  } else {
    console.log('invalid move');
    return false;
  }
}

Board.prototype.isFilled = function() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (this.field[i][j] === 0) {
        return false;
      }
    }
  }

  return true;
}

var Game = function() {
  this.board = new Board();
  this.turnO = false;
  // this.rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // })

  console.log('board: ', this.board);
  console.log('turn: ', this.turnO)
}

Game.prototype.play = function() {
  console.log('won? ', this.board.hasWinner())
  while(!this.board.hasWinner()) {
    this.turn();
    // if (!this.board.isFilled()) {
    //   console.log('draw');
    // } else {
    //   this.turn();
    // }
    // play a turn
  }
}

Game.prototype.turn = function() {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  var context = this;

  var turn = this.turnO? 'O' : 'X';
  console.log(turn + "'s turn.");

  rl.question('Enter a row:', function(row) {
    console.log("you entered ", row);

    rl.question('Enter a column: ', function(col) {
      console.log('you entered ', col);

      if (context.board.insert(row, col, turn)){
        if (!context.board.hasWinner()) {
          if (context.board.isFilled()) {
            console.log('draw');
            return 'draw';
          } else {
            context.turnO = !context.turnO;
            rl.close();
            context.turn();
          }
        } else {
          console.log(turn, ' won!');
          return;
        }
      } else {
        rl.close();
        context.turn();
      }
    })
  })

}

// var b1 = new Board();
// console.log('row: ', b1.hasRow())
// console.log('col: ', b1.hasCol())
// b1.insert(1, 1, 'O')

var g1 = new Game();
g1.turn();