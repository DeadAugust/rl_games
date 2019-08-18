/* Board Game Template Sketch
  August Luhrs @DeadAugust
  for ml5 RL examples
  Summer 2019
*/

<<<<<<< HEAD
//games (bY - rows, bX - cols)
let ttt = {
  bY: 3,
  bX: 3,
  p1: 'X',
  p2: 'O'
}

let c4 = {
  bY: 6,
  bX: 7,
  p1: 'red',
  p2: 'yellow'
};

class Square{
  constructor(rows, cols, gridY, gridX, cornerY, cornerX){ //rows, cols
    // this.gridY = gridY;
    // this.gridX = gridX;
    // this.cornerY = height/rows;
    // this.cornerX = width/cols;
    this.centerY = cornerY + ((gridY+1)*(squareSize/2));
    this.centerX = cornerX + ((gridX+1)*(squareSize/2));


    this.clicked = function(){ //need to be in constructor???
      let d = dist(mouseX, mouseY, this.centerX, this.centerY);

      if (d<(squareSize/2)){
        console.log(this.centerX, this.centerY);
        return true;
      }
    }
  }
}

class Board{
  constructor(bY, bX){
    this.rows = bY;
    this.cols = bX;
    this.cornerY = height/this.rows;
    this.cornerX = width/this.cols;
    let grid = [];
    for (let i = 0; i < this.rows; i++){
      grid[i] = [];
      for (let j = 0; j < this.cols; j++){
        // grid[i].push('');
        let newSq = new Square(this.rows, this.cols, i, j, this.cornerY, this.cornerX);
        grid[i].push(newSq);
      }
    }
    this.grid = grid;
  }
  move(){
    // console.log(this.grid);
    // console.log(game.board);
    // console.log(bX, bY);
  }
}

//overall variables
let game = {
  name: 'tic tac toe',
  params: ttt
}
// let gameBoard = ttt;
let gameSelect;
let reset;
let firstPlayer;
let gameStarted = false;
// let firstMove = false;
// let squareSize = 50;
let squareSize;
let boardSquares = []; //new attempt at reverse way of doing board/squares




function setup() {
  createCanvas(windowWidth, windowHeight);

  if (windowWidth < windowHeight){
    squareSize = windowWidth/10;
  } else {
    squareSize = windowHeight/10;
  }

  //game dropdown
  gameSelect = createSelect();
  gameSelect.position(width/2, height/20);
  gameSelect.option('tic tac toe');
  gameSelect.option('connect 4');
  // gameSelect.changed(changeGame);

  //reset game
  reset = createButton('New Game');
  reset.position(width/2, height/10);
  reset.mousePressed(resetGame);

}

function draw() {
  // background(220);
  push();
  textSize(20);
  if (gameStarted){
    text('Player Turn: ' + firstPlayer, width/2, 2 * height/10);
  }
  pop();
  drawBoard();
}

function mousePressed(){
  //need to make square class with clickable thing
  // game.board.move();
  console.log('XY: ', mouseX, mouseY);
  console.log('SS', squareSize);
  console.log('Corn:', game.board.cornerX, game.board.cornerY);
  for (let y = 0; y < game.board.cols; y++){
    // console.log(game.board.grid[y][0]);

    for (let x = 0; x < game.board.rows; x++){
      ellipse(game.board.grid[y][x].centerX, game.board.grid[y][x].centerY, squareSize/2, squareSize/2);
      if (game.board.grid[y][x].clicked()){
        console.log('row/col', y, x);
=======
let board = [
  ['X', 'O', 'O'],
  ['', 'X', ''],
  ['', 'O', ''],
];

let player1 = 'X';
let player2 = '0';

function setup(){
  createCanvas(400,400);

}

function draw(){
  background(220);
  let w = width/3;
  let h = height/3;

  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      let x = w * i + w/2;
      let y = h * j + h/2;
      let spot = board[i][j];
      if (spot == player1){
        ellipse(x,y,w);
      } else if (spot == player 2) {
        line(x, y, x+w, y+h);
        line(x+w, y, x, y+h);
>>>>>>> 3f3bae517a39d6f6df985234e1ed066abdcf372f
      }
    }
  }
}
<<<<<<< HEAD
function drawBoard(){

  // push();
  translate(width/game.params.bX, height/game.params.bY);
  for (let i = 0; i < game.params.bX; i++){
    for (let j = 0; j < game.params.bY; j++){
      stroke(2);
      rect((i+1)*squareSize, (j+1)*squareSize, squareSize, squareSize);
    }
  }
  // pop();
}
50
function resetGame(){
  gameStarted = true;
  //change game data
  game.name = gameSelect.value();
  if(game.name == 'tic tac toe'){
    game.params = ttt;
  } else if (game.name == 'connect 4'){
    game.params = c4;
  }
  game.board = new Board(game.params.bY, game.params.bX);
  //choose random first player
  let r = random([0, 1]);
  if (r == 0){
    firstPlayer = game.params.p1;
  } else {
    firstPlayer = game.params.p2;
  }
}
=======
>>>>>>> 3f3bae517a39d6f6df985234e1ed066abdcf372f
