//main AI file for sketch.js
//basically a combo of pit and Arena minus whats in ttt.js

//main play function for all possible combos:
//Human, Self-Trained, Downloaded, Random

function play(game, p1, p2, currentPlayer){
  const g = new TicTacToeGame();
  const args = {numMCTSSims: 50, cpuct: 1.0};
  let net1;
  let net2;
  let mcts1 = null;
  let mcts2 = null;
  // let AIplaying1 = false;
  // let AIplaying2 = false;
  let player1 = null;
  let player2 = null;
  // let humanPlayer1 = false;
  // let humanPlayer2 = false;
  // let firstPlayer;
  // if (p1 == currentPlayer){
  //   firstPlayer = p1;
  // } else {
  //   firstPlayer = p2;
  // }

  //if human playing
  if(p1 == 'human'){
    player1 = new HumanTicTacToePlayer(g);
  }
  if(p2 == 'human'){
    player2 = new HumanTicTacToePlayer(g);
  }

  // Load Self Trained Model


  //Load Downloaded Model
  if (p1 == 'downloaded'){
    net1 = ttt.downloadedModel;
    if (!net1){
      console.log('no downloaded model for ttt, return');
      return;
    }
    console.log('load downloaded ttt model to play');
  }
  if (p2 == 'downloaded'){
    net2 = ttt.downloadedModel;
    if (!net2){
      console.log('no downloaded model for ttt, return');
      return;
    }
    console.log('load downloaded ttt model to play');
  }

  //set up the MCTS
  if (p1 == 'downloaded' || p1 == 'self trained'){
    mcts1 = new MCTS(g, net1, args);

    const net1play = (x) => {
      const list = mcts1.getActionProb(x, 0);
      return Utils.argmax(list);
    }
    player1 = {play: net1play};
  }
  if (p2 == 'downloaded' || p2 == 'self trained'){
    mcts2 = new MCTS(g, net2, args);

    const net2play = (x) => {
      const list = mcts2.getActionProb(x, 0);
      return Utils.argmax(list);
    }
    player2 = {play: net2play};
  }

  //start with first player
  if (p1 == currentPlayer){
    const showdown = new Arena(player1, player2, g, display);
  } else {
    const showdown = new Arena(player2, player1, g, display);
  }
  // const action = showdown.playNewGameWithHuman();
  const action = showdown.playNewGame();
  return action;
}

function humanMove(action) {
  return showdown.humanStep(action, currentPlayer);
  // return -1; //why
}

new Arena {
  //player number reversed to distinguish, since its more about order here
  constructor(1player, 2player, game, display){
    console.log('making new arena');
    this.1player = 1player;
    this.2player = 2player;
    this.game = game;
    this.display = display;

    //grimmer
    this.players = null;
    this.curPlayer = 0; // 0:dummy. real values: 1 or -1
    this.boardNdArray = null;
  }

  playNewGame(); //trying to make one big papa
}
