/// game parameters and functions for Connect 4

let c4 = {
  bRows: 6,
  bCols: 7,
  p1: 'red',
  p2: 'yellow',
  display: function(board, y, x){
    //colored space
    push();
    fill(board.grid[y][x].slot);
    rect(board.grid[y][x].centerX, board.grid[y][x].centerY, squareSize, squareSize);
    pop();
  },
  update: function(board, y, x){ //don't really need y but whatever
    //falling animation later?
    for (let r = this.bRows - 1; r >= 0; r--){
      if (board.grid[r][x].slot == ''){ //find lowest empty slot in col.
        board.grid[r][x].slot = currentPlayer;
        return;
      }
    }
  },
  drawCheck: function(board){
    for (let y = 0; y < board.rows; y++){
      for (let x = 0; x < board.cols; x++){
        if (board.grid[y][x].slot == ''){
          //exits as soon as it sees board not full
          return false;
        }
      }
    }
    //if board is full
    return true;
  },
  winCheck: function(board, player){ //don't need player
    let winCount = 4;

    //wait, only need to check from move space.... but too complicated?
    //start from bottom right
    for (let y = board.rows - 1; y >= 0; y--){
      for (let x = board.cols - 1; x >= 0; x--){
        if (board.grid[y][x].slot == currentPlayer){
          if(checkStreak(board.grid, y, x, board.rows, board.cols)){ //goes through whole tree?
            return true;
          } else { //no win
            // console.log('no win');
          }
        }
      }
    }
    //new checkNeighbors without rats nest
    function checkStreak(grid, y, x, bRows, bCols){ //don't need check anymore
      for (let i = -1; i <= 1; i++){ //row neighbors
        for (let j = -1; j <= 1; j++){ //col neighbors
          if ((((y+i) != y) || ((x+j) != x)) && //to prevent checking own space
            ((y+i) < bRows && (y+i) >= 0 && (x+j) < bCols && (x+j) >= 0) && //to prevent out of bounds
            (grid[y+i][x+j].slot == currentPlayer)) { //lastly, if right color
              if (((y+i+i) < bRows && (y+i+i) >= 0 && (x+j+j) < bCols && (x+j+j) >= 0) &&
                ((y+i+i+i) < bRows && (y+i+i+i) >= 0 && (x+j+j+j) < bCols && (x+j+j+j) >= 0) &&
                (grid[y+i+i][x+j+j].slot == currentPlayer) &&
                (grid[y+i+i+i][x+j+j+j].slot == currentPlayer)){ //if continues streak all the way to 4
                  console.log('streak!');
                  grid[y][x].win = 'cyan';
                  grid[y][x].winWeight = 10;
                  grid[y+i][x+j].win = 'cyan';
                  grid[y+i][x+j].winWeight = 10;
                  grid[y+i+i][x+j+j].win = 'cyan';
                  grid[y+i+i][x+j+j].winWeight = 10;
                  grid[y+i+i+i][x+j+j+j].win = 'cyan';
                  grid[y+i+i+i][x+j+j+j].winWeight = 10;
                  return true;
              } else {
                return false;
              }
          } else {
            // console.log();
          }
        }
      }
    }
  }
};
