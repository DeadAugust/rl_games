// template board and board space (square) classes

class Square {
  constructor(bCols, bRows, gridX, gridY) { //
    this.bCols = bCols;
    this.bRows = bRows;
    this.gridX = gridX;
    this.gridY = gridY;

    //the center of each square for drawing
    this.centerX = boardCornerX + (gridX * squareSize) + squareSize / 2;
    this.centerY = boardCornerY + (gridY * squareSize) + squareSize / 2;

    //what's in it
    this.slot = '';

    //for win highlighting
    this.win = 'black';
    this.winWeight = 2;
  }
  clicked() {
    let d = dist(mouseX, mouseY, this.centerX, this.centerY);

    if (d < (squareSize / 2)) {
      console.log(this.slot, this.gridX, this.gridY, this.centerX, this.centerY);
      if (this.slot == '') { //only click on empty spaces (will need to change)
        return true;
      }
    }
  }
}

class Board {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;

    // relative size of board/squares and text
    squareSize = boardWidth / rows; //matters?
    textSize(4 * squareSize / 5);

    //top left corner of board
    boardCornerX = (width/2) - (boardWidth / 2);
    boardCornerY = (height/2) - (boardHeight / 2);

    //new/old 2D grid
    // let grid = new Array(this.rows).fill(Array(this.cols).fill(''));
    let grid = [];
    for (let y = 0; y < this.rows; y++){
      let gridRow = [];
      for (let x = 0; x < this.cols; x++){
        let newSq = new Square (cols, rows, x, y);
        // grid[y][x] = newSq; //can't remember why this doesn't work
        gridRow.push(newSq);
      }
      grid.push(gridRow);
    }
    console.log(grid);
    this.grid = grid;
  }
  draw() { //display game
    for (let y = 0; y < this.rows; y++){
      for (let x = 0; x < this.cols; x++){
        strokeWeight(this.grid[y][x].winWeight);
        stroke(this.grid[y][x].win);
        //different display for each game, some text some fill
        game.params.display(this, y, x);
      }
    }
  }
  move() { //click on board
    for (let y = 0; y < this.rows; y++){
      for (let x = 0; x < this.cols; x++){
        if (this.grid[y][x].clicked()) {
          //different click/move effects per game
          game.params.update(this, y, x);

          //after updating grid, check for win/draw
          if (game.params.winCheck(this, currentPlayer)){
            gameEnd = true;
            console.log(currentPlayer + " wins!");
          } else if (game.params.drawCheck(this)){
            gameEnd = true;
            console.log('draw');
          } else{ //if no win or draw, change player, next turn
            if (currentPlayer == game.params.p1) {
              console.log('player 2 turn');
              currentPlayer = game.params.p2;
            } else {
              console.log('player 1 turn');
              currentPlayer = game.params.p1;
            }
          }
        }
      }
    }
  }
}
