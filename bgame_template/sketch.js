/* Board Game Template Sketch
  August Luhrs @DeadAugust
  for ml5 RL examples
  Summer 2019
*/

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
      }
    }
  }
}
