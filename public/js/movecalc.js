/**
 * Finds a random move to make
 * @return {string} move to make
 */
var randomMove = function() {
  var possibleMoves = game.moves();
  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[randomIndex];
};

/**
 * Evaluates current chess board relative to player
 * @param {string} color - Players color, either 'b' or 'w'
 * @return {Number} board value relative to player
 */
var evaluateBoard_1 = function(board, color) {
  // Sets the value for each piece using standard piece value
  var pieceValue = {
    'p': 10,
    'n': 30,
    'b': 30,
    'r': 50,
    'q': 90,
    'k': 900
  };

  // Loop through all pieces on the board and sum up total
  var value = 0;
  board.forEach(function(row) {
    row.forEach(function(piece) {
      if (piece) {
        // Subtract piece value if it is opponent's piece
        value += pieceValue[piece['type']]
                 * (piece['color'] === color ? 1 : -1);
      }
    });
  });

  return value;
};

// From Lauri Hartikka's Simple Chess AI
// ---------------------------------------------------------

var reverseArray = function(array) {
    return array.slice().reverse();
};

var pawnEvalWhite =
[
	[0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
	[5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
	[1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
	[0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
	[0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
	[0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
	[0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
	[0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
[
	[-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
	[-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
	[-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
	[-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
	[-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
	[-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
	[-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
	[-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
];

var bishopEvalWhite = 
[
	[ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
	[ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
	[ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
	[ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
	[ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
	[ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
	[ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
	[ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = 
[
	[  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
	[  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
	[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	[  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = 
[
	[ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
	[ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
	[ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
	[ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
	[  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
	[ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
	[ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
	[ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = 
[
	[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
	[ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
	[  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
	[  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);

/**
// returns the calculated value of the peice taking into account location on the board
// @param {object} piece - chess peice we are looking at
// @param {number} x y - coordinates of of the board where the piece is located
*/
var getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};


/**
* Evaluates current chess board relative to player
* @param {string} color - Players color, either 'b' or 'w'
* @return {Number} board value relative to player
*/
var evaluateBoard_2 = function(board, color) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
		if (board[i][j] != null){
            		totalEvaluation += getPieceValue(board[i][j], i ,j) 
			* (board[i][j]['color'] === color ? 1 : -1);
		}	
        }
    }
    return totalEvaluation;
};

// -------------------------------------------------------------

/**
 * Calculates the best move using Minimax with Alpha Beta Pruning.
 * @param {Number} depth - How many moves ahead to evaluate
 * @param {Object} game - The game to evaluate
 * @param {string} playerColor - Players color, either 'b' or 'w'
 * @param {Number} alpha
 * @param {Number} beta
 * @param {Boolean} isMaximizingPlayer - If current turn is maximizing or minimizing player
 * @return {Array} The best move value, and the best move
 */
var calcBestMove = function(depth, game, playerColor, eval,
                            alpha=Number.NEGATIVE_INFINITY,
                            beta=Number.POSITIVE_INFINITY,
                            isMaximizingPlayer=true) {
  // Base case: evaluate board
  if (depth === 0 && eval === 1) {
    value = evaluateBoard_1(game.board(), playerColor);
    return [value, null]
  }
  else if (depth === 0 && eval === 2){
    value = evaluateBoard_2(game.board(), playerColor);
    return [value, null]
  }

  // Recursive case: search possible moves
  var bestMove = null; // best move not set yet
  var possibleMoves = game.moves();
  // Set random order for possible moves
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});
  // Set a default best move value
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
                                         : Number.POSITIVE_INFINITY;
  // Search through all possible moves
  for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    // Make the move, but undo before exiting loop
    game.move(move);
    // Recursively get the value from this move
    value = calcBestMove(depth-1, game, playerColor, eval, alpha, beta, !isMaximizingPlayer)[0];
    // Log the value of this move
    console.log(isMaximizingPlayer ? 'Max: ' : 'Min: ', depth, move, value,
                bestMove, bestMoveValue);

    if (isMaximizingPlayer) {
      // Look for moves that maximize position
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      alpha = Math.max(alpha, value);
    } else {
      // Look for moves that minimize position
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      beta = Math.min(beta, value);
    }
    // Undo previous move
    game.undo();
    // Check for alpha beta pruning
    if (beta <= alpha) {
      console.log('Prune', alpha, beta);
      break;
    }
  }
  // Log the best move at the current depth
  console.log('Depth: ' + depth + ' | Best Move: ' + bestMove + ' | ' + bestMoveValue + ' | A: ' + alpha + ' | B: ' + beta);
  // Return the best move, or the only move
  return [bestMoveValue, bestMove || possibleMoves[0]];
}
