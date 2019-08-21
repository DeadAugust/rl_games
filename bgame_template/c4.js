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
    //set up new 2D array to check
    //going to have issue with pointers?

    let winCount = 4;
    let checkGrid = [];
    for (let y = 0; y < board.rows; y++){
      let gridRow = [];
      for (let x = 0; x < board.cols; x++){
        let checkSq = board.grid[y][x]
        checkSq.checked = false; //to remove from grid
        checkSq.winner = false; //if in win streak
        gridRow.push(checkSq);
      }
      checkGrid.push(gridRow);
    }
    console.log("checkGrid:", checkGrid);

    //wait, only need to check from move space.... but too complicated?
    //start from bottom right
    for (let y = board.rows - 1; y >= 0; y--){
      for (let x = board.cols - 1; x >= 0; x--){
        if (checkGrid[y][x].slot == currentPlayer){
          if (checkGrid[y][x].checked == false){ //redundant?
            if(checkStreak(checkGrid, y, x, board.rows, board.cols)){ //goes through whole tree?
              // console.log(currentPlayer + " wins");
              return true;
            } else { //no win
              console.log('no win');
              // checkGrid[y][x].checked = true;
            }
          }
        }
      }
    }
    //new checkNeighbors without rats nest
    function checkStreak(grid, y, x, bRows, bCols){
      for (let i = -1; i <= 1; i++){ //row neighbors
        for (let j = -1; j <= 1; j++){ //col neighbors
          // console.log("row " + (y+i), "col: " + (x+j));
          if ((((y+i) != y) || ((x+j) != x)) && //to prevent checking own space
            ((y+i) < bRows && (y+i) >= 0 && (x+j) < bCols && (x+j) >= 0) && //to prevent out of bounds
            (grid[y+i][x+j].checked == false) && //if hasn't been checked
            // (grid[y+i][x+j].slot != '') && //if not empty
            (grid[y+i][x+j].slot == currentPlayer)) { //lastly, if right color
              // console.log('space valid: row ' +  (y+i) + " and col " + (x+j));
              console.log("this:");
              console.log(grid[y][x]);
              console.log("next:");
              console.log(grid[y+i][x+j]);
              if (((y+i+i) < bRows && (y+i+i) >= 0 && (x+j+j) < bCols && (x+j+j) >= 0) &&
                ((y+i+i+i) < bRows && (y+i+i+i) >= 0 && (x+j+j+j) < bCols && (x+j+j+j) >= 0) &&
                (grid[y+i+i][x+j+j].slot == currentPlayer) &&
                (grid[y+i+i+i][x+j+j+j].slot == currentPlayer)){ //if continues streak all the way to 4
                  console.log('streak!');
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
