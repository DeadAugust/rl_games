/* Board Game Template Sketch
  August Luhrs @DeadAugust
  for ml5 RL examples
  Summer 2019

  based on u/Grimmer1025's tf.js tic tac toe repo
*/
//DOM elements
let tttTrainButt, tttDownloadButt, c4TrainButt, c4DownloadButt; //left side
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
let circleSize; //for left legend
let textPixels;
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
  textPixels = height/36;

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
  //models
  tttTrainButt = createButton('Self-Train')
    .position(width/12, 9 * height/40)
    .size(width/8, height/15)
    // .style('fontSize', '30px')
    .style('fontSize', textPixels+'px')

    .mousePressed(tttTrain);
  tttDownloadButt = createButton('Download')
    .position(width/12, 13 * height/40)
    .size(width/8, height/15)
    .style('fontSize', textPixels+'px')
    .mousePressed(tttDownload);
  c4TrainButt = createButton('Self-Train')
    .position(width/12, 23 * height/40)
    .size(width/8, height/15)
    .style('fontSize', textPixels+'px')
    .mousePressed(c4Train);
  c4DownloadButt = createButton('Download')
    .position(width/12, 27 * height/40)
    .size(width/8, height/15)
    .style('fontSize', textPixels+'px')
    .mousePressed(c4Download);
  //legend
  circleSize = width/40;
  // CENTER DOM
  //game dropdown
  gameSelect = createSelect()
    .position(3* width / 8, height / 20)
    .size(width/4, height/20)
    .style('fontSize', textPixels+'px');
  gameSelect.option('tic tac toe'); //why doesn't option work unless I'm verbose?
  gameSelect.option('connect 4');

  //reset game
  reset = createButton('New Game')
    .position(7*width/16, 4* height / 30)
    .size(width/8, height/30)
    .style('fontSize', textPixels+'px')
    .mousePressed(resetGame);

  //RIGHT DOM
  //player options
  player1Select = createSelect();
  player1Select.position(11 * width / 14, 2* height / 6);
  player1Select.size(width/7, height/14);
  player1Select.style('fontSize', textPixels+'px'); //how to relative?
  player1Select.option('human');
  player1Select.option('self trained');
  player1Select.option('downloaded');
  player1Select.option('random');
  player1Select.changed(() => {
    player1 = player1Select.value();
  });
  player1 = player1Select.value();

  player2Select = createSelect();
  player2Select.position(11 * width / 14, 4 * height / 6);
  player2Select.size(width/7, height/14);
  player2Select.style('fontSize', textPixels+'px'); //how to relative?
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
  //LEFT
  push();
  textSize(height/30);
  text('Tic Tac Toe Models:', width/6, 3*height/20);
  fill(ttt.selfTrainModel);
  ellipse(3*width/12, 5*height/20, circleSize);
  fill(ttt.downloadModel);
  ellipse(3*width/12, 7*height/20, circleSize);
  fill(0);
  text('Connect 4 Models:', width/6, 10*height/20);
  fill(c4.selfTrainModel);
  ellipse(3*width/12, 12*height/20, circleSize);
  fill(c4.downloadModel);
  ellipse(3*width/12, 14*height/20, circleSize);
  pop();

  //legend
  push();
  textSize(height/40);
  fill('green');
  ellipse(width/12, 16* height/20, circleSize);
  fill('blue');
  ellipse(width/12, 17* height/20, circleSize);
  fill('yellow');
  ellipse(width/12, 18* height/20, circleSize);
  fill('red');
  ellipse(width/12, 19* height/20, circleSize);
  fill(0);
  text('Model Ready', width/6, 16*height/20);
  text('In Progress', width/6, 17*height/20);
  text('Error', width/6, 18*height/20);
  text('No Model', width/6, 19*height/20);
  pop();

  //CENTER
  push();
  noStroke();
  textSize(height/15);
  fill(0);
  if (gameEnd){
    text('GAME OVER ', width / 2, 9 * height / 10);
  } else if (gameStarted) {
    text('Player Turn: ' + currentPlayer, width / 2, 17 * height / 20);
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
