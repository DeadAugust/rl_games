/* Board Game Template Sketch
  August Luhrs @DeadAugust
  for ml5 RL examples
  Summer 2019

  based on u/Grimmer1025's tf.js tic tac toe repo
*/
//DOM elements
let trainButt, downloadButt; //left side
let gameSelect, reset; //center
let player1Select, player2Select, resetWinsButt; //right side

//overall variables
let game = { //just for start
  name: 'tic tac toe',
  params: ttt
}
let currentPlayer;
let player1, player2; //for select option storing
// let p1wins, p2wins; //moved to GameBoard.js
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
  // LEFT DOM


  // CENTER DOM
  //game dropdown
  gameSelect = createSelect()
    .position(width / 2, height / 20);
  gameSelect.option('tic tac toe'); //why doesn't option work unless I'm verbose?
  gameSelect.option('connect 4');

  //reset game
  reset = createButton('New Game')
    .position(width / 2, height / 10)
    .mousePressed(resetGame);

  //RIGHT DOM
  //player options
  player1Select = createSelect();
  player1Select.position(5 * width / 6, 2* height / 6);
  player1Select.size(width/7, height/14);
  player1Select.style('fontSize', '30px'); //how to relative?
  player1Select.option('human');
  player1Select.option('self trained');
  player1Select.option('downloaded');
  player1Select.option('random');
  player1Select.changed(() => {
    player1 = player1Select.value();
  });
  player1 = player1Select.value();

  player2Select = createSelect();
  player2Select.position(5 * width / 6, 4 * height / 6);
  player2Select.size(width/7, height/14);
  player2Select.style('fontSize', '30px'); //how to relative?
  player2Select.option('human');
  player2Select.option('self trained');
  player2Select.option('downloaded');
  player2Select.option('random');
  player2Select.changed(() => {
    player2 = player2Select.value();
  });
  player2 = player2Select.value();

  //reset game
  resetWinsButt = createButton('reset wins')
    .position(5 * width / 6, 7 * height / 8)
    .size(width/14, height/28)
    .mousePressed(()=>{
      p1wins = 0;
      p2wins = 0;
    });

  //starts with ttt
  p1wins = 0;
  p2wins = 0;
  resetGame();
}

function draw() {
  background(50, 225, 100); // green
  //CENTER
  push();
  noStroke();
  textSize(height/15);
  fill(0);
  if (gameEnd){
    text('GAME OVER ', width / 2, 2 * height / 10);
  } else if (gameStarted) {
    text('Player Turn: ' + currentPlayer, width / 2, 2 * height / 10);
  }
  pop();
  //RIGHT
  push();
  textSize(height/20);
  text('Player 1: ' + game.params.p1, 5 * width / 6, height / 6);
  text('p1 wins: ' + p1wins, 5* width/6, 3 * height/12);
  text('Player 2: ' + game.params.p2, 5 * width / 6, 3 * height / 6);
  text('p2 wins: ' + p2wins, 5* width/6, 7 * height/12);
  pop();

  //display game
  game.board.draw();
}

function mousePressed() { //check if square was clicked
  if (!gameEnd){
    game.board.move();
  }
}

function resetGame() {
  gameStarted = true;
  gameEnd = false;
  //reset player data
  // p1wins = 0;
  // p2wins = 0;
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
