//
//nj is numjs

class TicTacToeGame{
  constructor(n = 3){
    this.n = n; //redundancy
    this.rows = n;
    this.cols = n;
  }
  // getInitBoardNdArray){
  getSpaces(){
    // const b = new Board(this.n);
    const b = Array(this.rows).fill(Array(this.cols).fill(0));
    return nj.array(b);
  }
  // getBoardSize(){ //only in NNet classes, can be exchanged
  //   return {a: this.rows, b: this.cols};
  // }
  getActionSize(){
    //not sure why +1
    return (this.rows * this.cols) + 1;
  }
  // getNextState //where is this? Arena

  getVaidMoves(spacesArray, currentPlayer){
    //why
    const valids = Array(this.getActionSize()).fill(0);
    const b = Array(this.rows).fill(Array(this.cols).fill(0));
    b = spacesArray.tolist(); //2D to 1D?
  }
}

//shit, combining means it won't be able to train non-displaying...
