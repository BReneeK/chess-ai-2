var start = function(){

  console.log('Enter info as follows:\nplayGame(algo=4, skillW=(1,2,3), skillB=(1,2,3))');
  return;
}

// Computer makes a move with algorithm choice and skill/depth level
// TO-DO: NEED PARAMETER FOR EVAL METHOD (1, 2, or 3)
var makeMove = function(algo, skill=1) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm
  if (algo === 1) {
    var move = randomMove();
  } else if (algo === 2) {
    var move = calcBestMoveOne(game.turn());
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
  } else { // algo = 4 (alpha-beta pruning) - ONLY ALGO USED FOR PROJECT
    var move = calcBestMove(skill, game, game.turn())[1];
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
// Always have algo=4 for alpha-beta pruning
// skillW is the depth White goes to, skillB is the depth Black goes to
// TO-DO: ADD 2 MORE PARAMETERS; 1 FOR WHITE'S CHOSEN EVAL, 1 FOR BLACK'S (COULD BE 1, 2, OR 3)
var playGame = function(algo=4, skillW=1, skillB=1, evalW=1, evalB=1) {
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  
  var skill = game.turn() === 'w' ? skillW : skillB;
  var eval = game.turn() === 'w' ? evalW : evalB;

  makeMove(algo, skill, eval);
  window.setTimeout(function() {
    playGame(algo, skillW, skillB, evalW, evalB); //recursion
  }, 250);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};
