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



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
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

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({'n': n });

  var checkBoard = function (row) {

    if (row === n) { // base case: last rows in board 
      return solutionCount++;
    }  
    for (var i = 0; i < n; i++) {  

      board.togglePiece(row, i);

      if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts()) { // if does not have a conflict pass in board to recursive function

        checkBoard(row + 1);
      }
      board.togglePiece(row, i);
    }
     
  };


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

  if(n === 0){
    return solutionArray;
  }
  checkBoard(0);
  console.log(solution);
  for(var i = 0; i < n; i++){
    solutionArray.push(solution.get(i));
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solutionArray;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({'n': n });

  var checkBoard = function (row) {

    if (row === n) { // base case: last rows in board 
      return solutionCount++;
    }  
    for (var i = 0; i < n; i++) {  

      board.togglePiece(row, i);

      if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) { // if does not have a conflict pass in board to recursive function

        checkBoard(row + 1);
      }
      board.togglePiece(row, i);
    }
     
  };


  checkBoard(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
