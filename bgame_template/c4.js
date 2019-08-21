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
  winCheck: function(board, player){
    let winCount = 4;
    let count = 0;
  }
};
