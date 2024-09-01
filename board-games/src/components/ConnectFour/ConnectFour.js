import { GAME_PIECES } from "../../magic_numbers";

/**
 * static class used to group together functions for the connect four game logic 
 */
export default class CONNECT_FOUR {
    static NUM_ROWS = 6;
    static NUM_COLS = 7;

    // drop a piece on the board and return it on a new board
    static DROP_PIECE(board, activePlayer, col) {
      return board.map((row, rowIndex) => 
        row.map((colValue, colIndex) => {
          if (colIndex === col && colValue === GAME_PIECES.EMPTY && (rowIndex === board.length-1 || (rowIndex < board.length-1 && board[rowIndex+1][colIndex] !== GAME_PIECES.EMPTY))) {
            return activePlayer;
          }
          else {
            return colValue;
          }
        })
      );
    }

    // check if there is space in a column to add a piece
    static IS_COL_FULL(board, col) {
      if (board[0][col] !== GAME_PIECES.EMPTY){
        return true;
      }
      return false;
    }
  
    // check if the board is full
    static IS_BOARD_FULL(board) {
      for (let i=0; i<board[0].length; i++) {
        if (!CONNECT_FOUR.IS_COL_FULL(board, i)) return false
      }
      return true;
    }

    // find the first empty row in a column 
    // returns undefined if there is no empty row
    static FIND_EMPTY_ROW(board, col) {
      for (let i=board.length-1; i>=0; i--) {
        if (board[i][col] === GAME_PIECES.EMPTY) return i;
      }
    }
  
    // check if a move allows the player to win
    static IS_WIN_MOVE(board, activePlayer, col) {
      const row = CONNECT_FOUR.FIND_EMPTY_ROW(board, col);
      // console.log("checking row: " + row + " col: " + col);
      return CONNECT_FOUR.Check_Horizontal(board, activePlayer, row, col) || CONNECT_FOUR.Check_Vertical(board, activePlayer, row, col) || CONNECT_FOUR.Check_Left_Diagonal(board, activePlayer, row, col) || CONNECT_FOUR.Check_Right_Diagonal(board, activePlayer, row, col);
    }
  
    // check the horizontal pieces 
    static Check_Horizontal(board, activePlayer, row, col) {
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
    static Check_Vertical(board, activePlayer, row, col) {
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
    static Check_Left_Diagonal(board, activePlayer, row, col) {
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
    static Check_Right_Diagonal(board, activePlayer, row, col) {
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