//set up new 2D array to check
//going to have issue with pointers?

let winCount = 4;
let checkGrid = [];
for (let y = 0; y < board.rows; y++){
  let gridRow = [];
  for (let x = 0; x < board.cols; x++){
    let checkSq = grid[y][x]
    checkSq.checked = false; //to remove from grid
    checkSq.winner = false; //if in win streak
    gridRow.push(checkSq);
  }
  checkGrid.push(gridRow);
}

//start from bottom right
for (let y = board.rows - 1; y >= 0; y--){
  for (let x = board.cols - 1; x >= 0; x--){
    if (checkGrid[y][x].slot == currentPlayer){
      if (checkGrid[y][x].checked == false){ //redundant?
        if(checkStreak(checkGrid, y, x, 0, board.rows, board.cols) == false){ //goes through whole tree?
            checkGrid[y][x].checked = true;
        } else { //win?
          console.log(currentPlayer + " wins");
        }
      }
    }
  }
}

//new checkNeighbors without rats nest
function checkStreak(grid, y, x, count, bRows, bCols){
  for (let i = -1; i <= 1; i++){ //row neighbors
    for (let j = -1; j <= 1; j++){ //col neighbors
      if (((y+i) != y) && ((x+j) != x)) && //to prevent checking own space
        ((y+i) < bRows && (y+i) >= 0 && (x+j) < bCols && (x+j) >= 0) && //to prevent out of bounds
        (grid[y+i][x+j].checked == false){ //if hasn't been checked
            if ((grid[y+i][x+j].slot == currentPlayer) &&
              (grid[y+i+i][x+j+j].slot == currentPlayer) &&
              (grid[y+i+i+i][x+j+j+j].slot == currentPlayer)){ //if continues streak all the way to 4
                return true;
            } else {
              return false;
            }
          }
        }
      }
    }
  }
}

/*
//lol this is just pixel neighbor/ convolution matrix huh... or some sort of clunky tree search?
function checkNeighbors(grid, y, x, count, bRows, bCols){
  if count < winCount {
    let currentCount = count + 1;
    let space = grid[y][x];
    for (let i = -1; i <= 1; i++){ //row neighbors
      for (let j = -1; j <= 1; j++){ //col neighbors
        if (((y+i) != y) && ((x+j) != x)){ //to prevent checking own space
          if ((y+i) < bRows && (y+i) >= 0 && (x+j) < bCols && (x+j) >= 0){ //to prevent out of bounds
            if (grid[y+i][x+j].checked == false){ //if hasn't been checked
              if (grid[y+i][x+j].slot == currentPlayer){ //if continues streak
                  if (currentCount < winCount){
                    currentCount = checkNeighbors(grid, y+i, x+j, currentCount); //issue b/c can go back and forth/ no direction
                    if (currentCount == winCount){
                      console.log('count win');
                      return currentCount;
                    }
                  } else if (currentCount == winCount){
                    console.log('is this possible?');
                    return currentCount;
                  }
              } else {
                console.log('how this happen?');
                return;
              }
            }
          }
        }
        currentCount = count + 1; //correct location?
      }
    }
  } else if (count == winCount){
    return count;
  } else {
    console.log('how this?');
  }
  return currentCount; //return string?
}
*/
