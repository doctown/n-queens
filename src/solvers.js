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
  var solution = undefined; 
  var solutionArr = [];
  //create empty matrix to work with, init all values to 0

  //recursive function that creates a potential solution board
  var checkBoard = function (board, row) {
    // if rows is equal to n
      // check if valid solution
        // return board if solution is valid
    // for every position in this row
    for (var i = 0; i < n; i++) {
      if (row === n) { // base case: last rows in board 
        solution = board;
        return;
      } else {
        var newBoard = JSON.parse(JSON.stringify(board));
        newBoard.get(row)[i] = 1;
        if (!newBoard.hasColConflictAt(i)) { // if does not have a conflict pass in board to recursive function
          checkBoard(newBoard, row + 1);
        }
      }
    }
  };
  
  var startBoard = new Board({'n': n});

  // for loop every position in  first row
  for (var i = 0; i < n; i++) {
    var newBoard = JSON.parse(JSON.stringify(startBoard));
    newBoard.get(0)[i] = 1;
    if (solution === undefined) {
      checkBoard(board, 1);
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  for (var i = 0; i < n; i++) {
    solutionArr.push(solution.get(i));
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme

  // var solution = []; //fixme

  // var checkBoard = function (board, row) {
  //   // if rows is equal to n
  //     // check if valid solution
  //       // return board if solution is valid
  //   // for every position in this row
  //   for (var i = 0; i < n; i++) {
  //     if (row === n) { // base case: last rows in board 
  //       solution.push(board);
  //       return;
  //     } else {
  //       var newBoard = jQuery.extend(true, {}, board);
  //       var myRow = newBoard.get(row);
  //       myRow[i] = 1;
  //       //newBoard.set({row: myRow});
  //       if (!newBoard.hasColConflictAt(i)) { // if does not have a conflict pass in board to recursive function
  //         checkBoard(newBoard, row + 1);
  //       }
  //     }
  //   }
  // };


  // // for loop every position in  first row
  // for (var i = 0; i < n; i++) {
  //   var board = new Board({'n': n });
  //   var newRow = board.get(0);
  //   newRow[i] = 1;
  //   //board.set({0: newRow});
  //   checkBoard(board, 1);
  // }

  // // var solutionBoard = [];
  // // for (var i = 0; i < n; i++) {
  // //   solutionBoard.push(solution.get(i));
  // // }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solution.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
