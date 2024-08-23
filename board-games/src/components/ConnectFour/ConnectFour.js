/**
 * static class representing a connect four board 
 * - used to group together functions and variables related to the connect four board
 * - handles the logic of the game behind the scenes 
 */
export default class Board {
    // Pieces 
    static EMPTY = 0;
    static PLAYER_1 = 1;
    static PLAYER_2 = 2;

    // Game Status 
    static PLAY = 0;
    static PLAYER_1_WIN = 1;
    static PLAYER_2_WIN = 2;
    static TIE = 3;

    // initalizes and return a new board 
    static setup() {
      return [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ];
    }
  
    // drop a piece on the board and return it on a new board
    static dropPiece(board, activePlayer, col) {
      return board.map((row, rowIndex) => 
        row.map((colValue, colIndex) => {
          if (colIndex === col && colValue === Board.EMPTY && (rowIndex === board.length-1 || (rowIndex < board.length-1 && board[rowIndex+1][colIndex] !== Board.EMPTY))) {
            return activePlayer;
          }
          else {
            return colValue;
          }
        })
      );
    }

    // check if there is space in a column to add a piece
    static isColFull(board, col) {
      if (board[0][col] !== Board.EMPTY){
        return true;
      }
      return false;
    }
  
    // check if the board is full
    static isBoardFull(board) {
      for (let i=0; i<board[0].length; i++) {
        if (!Board.isColFull(board, i)) return false
      }
      return true;
    }

    // find the first empty row in a column 
    // returns undefined if there is no empty row
    static findEmptyRow(board, col) {
      for (let i=board.length-1; i>=0; i--) {
        if (board[i][col] === Board.EMPTY) return i;
      }
    }
  
    // check if a move allows the player to win
    static isWinMove(board, activePlayer, col) {
      const row = Board.findEmptyRow(board, col);
      // console.log("checking row: " + row + " col: " + col);
      return Board.checkHorizontal(board, activePlayer, row, col) || Board.checkVertical(board, activePlayer, row, col) || Board.checkLeftDiagonal(board, activePlayer, row, col) || Board.checkRightDiagonal(board, activePlayer, row, col);
    }
  
    // check the horizontal pieces 
    static checkHorizontal(board, activePlayer, row, col) {
      let count = 0;
      // check pieces to the left
      for (let i=col-1; i>=0 && i>=col-3; i--) {
        if (board[row][i] === activePlayer) {
          count++;
        }
        else {
          break;
        }
      }
      // check pieces to the right
      for (let i=col+1; i<board[0].length && i<=col+3; i++) {
        if (board[row][i] === activePlayer) { 
          count++;
        }
        else {
          break;
        }
      }
      return count > 2;
    }
  
    // check the vertical pieces
    static checkVertical(board, activePlayer, row, col) {
      let count = 0;
      // check pieces below 
      for (let i=row+1; i<board.length && i<=row+3; i++) {
        if (board[i][col] === activePlayer) {
          count++;
        }
        else {
          break;
        }
      }
      return count > 2;
    }
  
    // check the pieces along the left diagonal 
    static checkLeftDiagonal(board, activePlayer, row, col) {
      let count = 0;
      // check diagonal piecies above
      for (let i=row-1, j=col-1; i>=0 && j>=0 && i>=row-3; i--, j--) {
        if (board[i][j] === activePlayer) {
          count++;
        }
        else {
          break;
        }
      }
      // check diagonal pieces below
      for (let i=row+1, j=col+1; i<board.length && j<board[0].length && i<=row+3; i++, j++) {
        if (board[i][j] === activePlayer) {
          count++;
        }
        else {
          break;
        }
      }
      return count > 2;
    }
  
    // check the pieces along the right diagonal 
    static checkRightDiagonal(board, activePlayer, row, col) {
      let count = 0;
      // check diagonal piecies above
      for (let i=row-1, j=col+1; i>=0 && j<=board[0].length && i>=row-3; i--, j++) {
        if (board[i][j] === activePlayer) {
          count++;
        }
        else {
          break;
        }
      }
      // check diagonal piecies below
      for (let i=row+1, j=col-1; i<board.length && j>=0 && i<=row+3; i++, j--) {
        if (board[i][j] === activePlayer) {
          count++;
        }
        else {
          break;
        }
      }
      return count > 2;
    }
}