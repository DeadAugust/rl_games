/* Board Game Template Sketch
  August Luhrs @DeadAugust
  for ml5 RL examples
  Summer 2019
*/
//games x,y = col,row
let ttt = {
  bRows: 3,
  bCols: 3,
  p1: 'X',
  p2: 'O',
  drawCheck: function(board){
    for (let y = 0; y < board.rows; y++){
      for (let x = 0; x < board.cols; x++){
        if (board.grid[y][x].slot == ''){
          return false;
        }
      }
    }
    return true;
  },
  winCheck: function(board, player){ //need to pass game.board as board
    let winCount = 3;
    let count = 0;
    //vertical check
    for (let x = 0; x < board.cols; x++){
      count = 0;
      for (let y = 0; y < board.rows; y++) {
        if (board.grid[y][x].slot === player) {
          count += 1;
        }
      }
      if (count == winCount) {
        for (let w = 0; w < board.rows; w++){
          board.grid[w][x].win = 'gold';
          board.grid[w][x].winWeight = 10;
        }
        return true;
      }
    }
    //horizontal check
    for (let y = 0; y < board.rows; y++) {
      count = 0;
      for (let x = 0; x < board.cols; x++){
        if (board.grid[y][x].slot === player) {
          count += 1;
        }
      }
      if (count == winCount) {
        for (let w = 0; w < board.cols; w++){
          board.grid[y][w].win = 'gold';
          board.grid[y][w].winWeight = 10;
        }
        return true;
      }
    }
    //diagonal checks
    count = 0;
    for (let d = 0; d < board.rows; d++){ //hmm how to do diagonal for c4?
      if (board.grid[d][d].slot === player){
        count += 1;
      }
    }
    if (count == winCount) {
      for (let w = 0; w < board.rows; w++){
        board.grid[w][w].win = 'gold';
        board.grid[w][w].winWeight = 10;
      }
      return true;
    }
    count = 0;
    for (let d = 0; d < board.rows; d++){
      if (board.grid[d][board.rows - d - 1].slot === player){
        count += 1;
      }
    }
    if (count == winCount){
      for (let w = 0; w < board.rows; w++){
        board.grid[w][board.rows - w - 1].win = 'gold';
        board.grid[w][board.rows - w - 1].winWeight = 10;
      }
      return true;
    }
  }
}

let c4 = {
  bRows: 6,
  bCols: 7,
  p1: 'red',
  p2: 'yellow'
};

//DOM elements
let gameSelect, reset;
//overall variables
let game = { //just for start
  name: 'tic tac toe',
  params: ttt
}
let currentPlayer;
let gameStarted = false;
// let firstMove = false;
let squareSize; //need to make a part of board variable so bigger board still small
//board stats same for all games:
let wideScreen;
let boardWidth, boardLength;
let boardCenterX, boardCenterY;
let boardCornerX, boardCornerY;
// let win = false;
let gameEnd = false;

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
      if (this.slot == '') {
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
        rect(this.grid[y][x].centerX, this.grid[y][x].centerY, squareSize, squareSize);
        text(this.grid[y][x].slot, this.grid[y][x].centerX, this.grid[y][x].centerY);
      }
    }
  }
  move() { //click on board
    for (let y = 0; y < this.rows; y++){
      for (let x = 0; x < this.cols; x++){
        if (this.grid[y][x].clicked()) {
          this.grid[y][x].slot = currentPlayer;
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


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  if (windowWidth < windowHeight) {
    // squareSize = windowWidth/10;
    wideScreen = false;
    boardWidth = width / 2;
    boardHeight = boardWidth;
  } else {
    // squareSize = windowHeight/10;
    wideScreen = true;
    boardHeight = height / 2;
    boardWidth = boardHeight;
  }

  //game dropdown
  gameSelect = createSelect();
  gameSelect.position(width / 2, height / 20);
  gameSelect.option('tic tac toe');
  gameSelect.option('connect 4');
  // gameSelect.changed(changeGame);

  //reset game
  reset = createButton('New Game');
  reset.position(width / 2, height / 10);
  reset.mousePressed(resetGame);

  resetGame(); //starts with ttt
}

function draw() {
  background(220);
  push();
  noStroke();
  textSize(20);
  if (gameEnd){
    text('GAME OVER ', width / 2, 2 * height / 10);
  } else if (gameStarted) {
    text('Player Turn: ' + currentPlayer, width / 2, 2 * height / 10);
  }
  pop();
  game.board.draw();
}

function mousePressed() { //check if square was clicked
  game.board.move();
}

function resetGame() {
  gameStarted = true;
  gameEnd = false;
  //change game data
  game.name = gameSelect.value();
  if (game.name == 'tic tac toe') {
    game.params = ttt;
  } else if (game.name == 'connect 4') {
    game.params = c4;
  }
  game.board = new Board(game.params.bCols, game.params.bRows);
  //choose random first player
  let r = random([0, 1]);
  if (r == 0) {
    currentPlayer = game.params.p1;
  } else {
    currentPlayer = game.params.p2;
  }
}
