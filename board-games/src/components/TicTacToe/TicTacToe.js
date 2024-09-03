import { GAME_PIECES } from "../../magic_numbers";

/**
 * static class used to group together functions and variables for the tictactoe game logic 
 */
export default class TIC_TAC_TOE {
    static NUM_ROWS = 3;
    static NUM_COLS = 3;

    // check if a space is empty
    static IS_EMPTY(board, x, y) {
        return board[x][y] === GAME_PIECES.EMPTY;
    }

    static IS_FULL(board) {
        return board.every((row) => 
            row.every((colValue) => colValue !== GAME_PIECES.EMPTY)
        );
    }

    // return a new board with a new piece placed on it 
    static PLACE_PIECE(board, activePlayer, x, y) {
        return board.map((row, rowIndex) => 
            row.map((colValue, colIndex) => {
                if (rowIndex === x && colIndex === y) {
                    return activePlayer;
                }
                else {
                    return colValue;
                }
            })
        );
    }
    
    // check for win conditions on the board 
    // returns null if there is no win condition 
    static IS_WINNER(board, activePlayer) {
        // check every row
        if ((board[0][0] === activePlayer && board[0][1] === activePlayer && board[0][2] === activePlayer)
            || (board[1][0] === activePlayer && board[1][1] === activePlayer && board[1][2] === activePlayer)
            ||(board[2][0] === activePlayer && board[2][1] === activePlayer && board[2][2] === activePlayer)) {
            return true;
        }
        // check every column 
        else if ((board[0][0] === activePlayer && board[1][0] === activePlayer && board[2][0] === activePlayer)
            || (board[0][1] === activePlayer && board[1][1] === activePlayer && board[2][1] === activePlayer)
            || (board[0][2] === activePlayer && board[1][2] === activePlayer && board[2][2] === activePlayer) ) {
            return true;
        }
        // check left diagonal 
        else if (board[0][0] === activePlayer && board[1][1] === activePlayer && board[2][2] === activePlayer) {
            return true;
        }
        // check left diagonal 
        else if (board[0][2] === activePlayer && board[1][1] === activePlayer && board[2][0] === activePlayer) {
            return true;
        }
        else {
            return false;
        }
    }
}