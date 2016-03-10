// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var numOfRows = this.get('n');
      var conflictFound = false;

      for (var i = 0; i < numOfRows; i++) {
        if (this.hasRowConflictAt(i)) {
          conflictFound = true;
        }
      }
      return conflictFound;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      var numOfCol = this.get('n');
      for (var i = 0; i < numOfCol; i++) {
        if (this.get(i)[colIndex] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numOfCols = this.get('n');
      var conflictFound = false;

      for (var i = 0; i < numOfCols; i++) {
        if (this.hasColConflictAt(i)) {
          conflictFound = true;
        }
      }
      return conflictFound;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //_getFirstRowColumnIndexForMajorDiagonalOn
      var n = this.get('n');
      var count = 0;
      var initRow = 0;
      var initCol = 0;

      // for each row, check for each row, check diagonal conflict
      if (majorDiagonalColumnIndexAtFirstRow > 0) {
        initCol = majorDiagonalColumnIndexAtFirstRow;
      } else if (majorDiagonalColumnIndexAtFirstRow < 0) {
        initRow = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      }
      // for each iteration, increment the count of row and col by 1
      for (var row = initRow; row < n; row++) {
        if (this.get(row)[initCol] === 1) {
          count++;
        }
        initCol++;
      }

      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // get the number of columns
      var lastColIndexAtFirstRow = -(this.get('n')) + 1;
      var n = this.get('n');
      var hasDiagConflict = false;

      // for all columns call major diagonal conflict on that column
      for (var i = lastColIndexAtFirstRow + 1; i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          hasDiagConflict = true;
          break;
        }
      }
      return hasDiagConflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var count = 0;
      var initRow = 0;
      var initCol = n - 1;

      // for each row, check for each row, check diagonal conflict
      if (minorDiagonalColumnIndexAtFirstRow >= n) {
        initRow = minorDiagonalColumnIndexAtFirstRow - (n - 1);
      } else if (minorDiagonalColumnIndexAtFirstRow < n) {
        initCol = minorDiagonalColumnIndexAtFirstRow;
      }
      // for each iteration, increment the count of row and col by 1
      for (var row = initRow; row < n; row++) {
        // if row/col equals 1 increment count
        if (this.get(row)[initCol] === 1) {
          count++;
        }
        initCol--;
      }

      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // get the number of columns
      var hasDiagConflict = false;
      var n = this.get('n');

      // for all columns call minor diagonal conflict on that column
      for (var i = 0; i < 2 * (n - 1); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          hasDiagConflict = true;
          break;
        }
      }
      return hasDiagConflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
