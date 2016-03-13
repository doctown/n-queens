/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
var hasColConflict = function (board) {
  //var bits = 0;
  //for (var i = 0; i < board.length; i++) {
  //  bits |= board[i];
  //}
  //
  //bits = ~bits;
  //for (var i = 0; i < board.length; i++) {
  //  bits ^= board[i];
  //}
  //return -1 !== bits;
  // for each number compare with the number below
  var hasConflict = false;
  for (var i = 0; i < board.length; i++) {
    for (var k = i + 1; k < board.length; k++) {
      if ((board[i] & board[k]) > 0) {
        hasConflict = true;
      }
    }
  }
  return hasConflict;
};

var hasDiagConflict = function (board) {
  var hasConflict = false;
  // for each
  // shift the distance from i ,this and that === 0
  for (var i = 0; i < board.length; i++) {
    for (var k = i + 1; k < board.length; k++) {
      if ((board[i] & (board[k] << (k-i))) > 0) {
        hasConflict = true;
      }
    }
  }

  for (var i = 0; i < board.length; i++) {
    for (var k = i + 1; k < board.length; k++) {
      if ((board[i] & (board[k] >> (k-i))) > 0) {
        hasConflict = true;
      }
    }
  }
  return hasConflict;
};

window.findNRooksSolution = function(n) {
  var solution = [];
  var rookPos = 0;

  while (solution.length < n) {
    var row = [];
    for(var i = 0; i < n; i++) {
      if(i === rookPos) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    solution.push(row);
    rookPos++;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

var createBoard = function (size) {
  var board = [];
  for (var i = 0; i < size; i++) {
    board.push(0);
  }

  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  // var board = new Board({'n': n });
  var board = createBoard(n);

  var checkBoard = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      if (i === 0) {
        board[row] = 1;
      } else {
        if (board[row] === 0) {
          board[row] = 1;
        }
        board[row] = board[row] << i;
      }
      if (!hasColConflict(board)) {
        checkBoard(row + 1);
      }
      board[row] = board[row] >> i + 1;
    }
  };

  //var oldCheckBoard = function (row) {
  //
  //  if (row === n) { // base case: last rows in board
  //    return solutionCount++;
  //  }
  //  for (var i = 0; i < n; i++) {
  //
  //    board.togglePiece(row, i);
  //
  //    if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts()) { // if does not have a conflict pass in board to recursive function
  //
  //      checkBoard(row + 1);
  //    }
  //    board.togglePiece(row, i);
  //  }
  //
  //};


  checkBoard(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount; // solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  var solutionArray = [];
  var board = new Board({'n': n });

  var checkBoard = function (row) {
    if(solution === undefined){

      if (row === n) { // base case: last rows in board 
        solution = jQuery.extend(true, {}, board);
        return;
      }  
      for (var i = 0; i < n; i++) {  

        board.togglePiece(row, i);

        if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) { // if does not have a conflict pass in board to recursive function

          checkBoard(row + 1);
        }
        board.togglePiece(row, i);
      }
    }
     
  };

  if(n === 2 || n === 3){
    for(var i = 0; i < n; i++){
      solutionArray.push([]);
    }
    return solutionArray;
  }
  checkBoard(0);
  console.log(solution);
  for(var i = 0; i < n; i++){
    solutionArray.push(solution.get(i));
  }
  console.log(solutionArray);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solutionArray;
};

var date = new Date();

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var now = date.getTime();
  var solutionCount = 0;
  // var board = new Board({'n': n });
  var board = createBoard(n);

  var checkBoard = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      if (i === 0) {
        board[row] = 1;
      } else {
        if (board[row] === 0) {
          board[row] = 1;
        }
        board[row] = board[row] << i;
      }
      if (!hasColConflict(board) && !hasDiagConflict(board)) {
        checkBoard(row + 1);
      }
      board[row] = board[row] >> i + 1;
    }
  };
  //
  //var oldCheckBoard = function (row) {
  //
  //  if (row === n) { // base case: last rows in board
  //    return solutionCount++;
  //  }
  //  for (var i = 0; i < n; i++) {
  //
  //    board.togglePiece(row, i);
  //
  //    if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) { // if does not have a conflict pass in board to recursive function
  //
  //      checkBoard(row + 1);
  //    }
  //    board.togglePiece(row, i);
  //  }
  //
  //};

  checkBoard(0);
  date = new Date();
  var later = date.getTime();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount, "in ", now, "milliseconds.", later," milliseconds");
  return solutionCount;
};
