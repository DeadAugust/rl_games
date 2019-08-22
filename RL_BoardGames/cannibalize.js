


let slowTimer = 50;
let awaitToggle = true;

//Tic Tac Toe board
let squares = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
// let squares = ["X", "X", "O",  "O",  "X",  "X",  "O", "O",  "X"];






    //empty board to start
    drawGame(squares);

}


        if (squares[y][x] != 0){ // X: -1, O: 1
          push();
          fill(0);
          noStroke();
          if (squares[y][x] == -1){
            text("X", ((x*2)+1)*textSpot, ((y*2)+1)*textSpot);
            // console.log(" DRAW X ")
          } else{// it's 1
            text("O", ((x*2)+1)*textSpot, ((y*2)+1)*textSpot);
            // console.log(" DRAW O ")


}


twoRandomPlay =() => {
  play(0);
}

startTrain = async () => {
  console.log('start-train');
  let mill = millis()/1000;
  console.log(mill);
  await train();
  console.log('end-train');
  let mill2 = millis()/1000;
  console.log(mill2);
  // this.setState({ selfTrained: true });
  state.selfTrained = true;
}

startNewGame = () => {
  console.log('start new game');
  squares = [[],[],[]];
  if (state.enabledAI) {
    if (state.selfTrained === false && state.aiIsDownloaded === false) {
      alert('ai is not download yet');
    }
    // gameStarted = true;
    let action;
    if (state.selfTrained) {
      action = play(4, state.aiFirst);
    } else {
      action = play(3, state.aiFirst);
    }
    // this.setState((prevState, props) => ({ aiFirst: !prevState.aiFirst }));
    state.aiFirst = !state.aiFirst; //I'm guessing it just takes turns?

    if (action >= 0) {
      console.log('ai starts at:', action);
      return action;
    }
  }
  return -1;
}

/// PITTTT

let humanArena = null;

// async function downloadPretrainedPit() {
//   if (!preTrainedModel) {
//     // if (!humanGame) {
//     const humanGame = new TicTacToeGame();
//     // }
//     preTrainedModel = new NNetWrapper(humanGame);
//     // firstPlayr = new players.RandomPlayer(g);
//     await preTrainedModel.loadPretrained('https://grimmer.io/alphago-tictactoe-keras-trained/model.json');
//   }
// }

function humanMove(action) {
  if (humanArena) {
    return humanArena.humanStep(action);
  }

  return -1;
}

/**
 * play a game or games
 * mode:
 *  0: two rp
 *  1: self-trained vs rp
 *  2: 1 pretrained vs rp
 *  3: 1 pretrained vs human
 *  4: self-trained vs human
 */
function play(mode, aiFirst) {
  const g = new TicTacToeGame();
  const args1 = { numMCTSSims: 50, cpuct: 1.0 };
  let n1;
  let mcts1 = null;
  let firstPlayr = null;

  if (mode === 1 || mode === 4) {
    n1 = getTrainedNN();
    if (!n1) {
      console.log('no trainedModel, return');
      return;
    }
  } else if (mode === 2 || mode === 3) {
    n1 = preTrainedModel;
    if (!n1) {
      console.log('no preTrainedModel, return');
      return;
    }
    console.log('load pretrained to play');
  } else if (mode === 0) {
    firstPlayr = new RandomPlayer(g);

  } else {
    console.log('invalid mode, return');
    return;
  }

  if (mode) {
    mcts1 = new MCTS(g, n1, args1);

    const n1p = (x) => {
      const list = mcts1.getActionProb(x, 0);
      //try and assign to squares -- no, this is just one
      // let count = 0;
      // for (let y = 0; y < 3; y ++){ //row
      //   for (let x = 0; x < 3; x++){ //col
      //     squares[y][x] = list[count];
      //     count++;
      //   }
      // }
      // console.log(squares);
      return Utils.argmax(list);
    };
    firstPlayr = { play: n1p };
  } else {
    firstPlayr = new RandomPlayer(g);
  }

  if (mode === 3 || mode === 4) {
    const hp = new HumanTicTacToePlayer(g);// .play
    // console.log(display);
    if (aiFirst) {
      humanArena = new Arena(firstPlayr, hp, g, display);
    } else {  // if (humanPlaying) {
  //   humanStep(0);
  //
  // }
      humanArena = new Arena(hp, firstPlayr, g, display);
    }
    const action = humanArena.playNewGameWithHuman();

    return action;
  }


  // const rp = new players.RandomPlayer(g);// .play;
  const rp2 = new RandomPlayer(g);// .play;

  const arena = new Arena(firstPlayr, rp2, g, display);
  console.log(arena.playGames(25, true));
  console.log('finish');
}
