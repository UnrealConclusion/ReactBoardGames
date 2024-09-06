import { BOARD } from "../../board";
import { GAME_PIECES } from "../../magic_numbers";

class CHECKERS_PIECES extends GAME_PIECES {
    static VOID = -1;
    static PLAYER_1_KING = 3;
    static PLAYER_2_KING = 4;
}

/**
 * static class used to group together functions and variables for the checkers game logic 
 */
class CHECKERS {
    static NUM_ROWS = 8;
    static NUM_COLS = 8;

    /**
     * initalize the checker board to the starting state
     * - place all the piece on the board 
     * - mark all the inactive squares you can't move on 
     */
    static SETUP_CHECKER_BOARD(){
        let board = BOARD.SETUP(this.NUM_ROWS, this.NUM_COLS);
        for (let i=0; i<board.length; i++) {
            if (i % 2 !== 0) {
                for (let j=0; j<board[i].length; j++){
                    if (j % 2 !== 0) {
                        board[i][j] = CHECKERS_PIECES.VOID;
                    }
                    else if (i < 3) {
                        board[i][j] = CHECKERS_PIECES.PLAYER_1;
                    }
                    else if (i > 4) {
                        board[i][j] = CHECKERS_PIECES.PLAYER_2;
                    }
                }
            }
            else {
                for (let j=0; j<board[i].length; j++){
                    if (j % 2 === 0) {
                        board[i][j] = CHECKERS_PIECES.VOID;
                    }
                    else if (i < 3) {
                        board[i][j] = CHECKERS_PIECES.PLAYER_1;
                    }
                    else if (i > 4) {
                        board[i][j] = CHECKERS_PIECES.PLAYER_2;
                    }
                }
            }
        }
        return board;
    }

    // returns an exact copy of a board
    static COPY_BOARD(board) {
        let copy = BOARD.SETUP(this.NUM_ROWS, this.NUM_COLS);
        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board[i].length; j++) {
                copy[i][j] = board[i][j];
            }
        }
        return copy;
    }

    static IS_VALID_MOVE(board, pieceType, currentRow, currentCol, targetRow, targetCol) {
        // target space is not empty
        if (board[targetRow][targetCol] !== CHECKERS_PIECES.EMPTY) return false;


        if (pieceType === CHECKERS_PIECES.PLAYER_1) {
            // check two rows below
            if (targetRow === currentRow+2) {
                if (targetCol === currentCol+2 && board[currentRow+1][currentCol+1] === CHECKERS_PIECES.PLAYER_2) return true;
                if (targetCol === currentCol-2 && board[currentRow+1][currentCol-1] === CHECKERS_PIECES.PLAYER_2) return true;
            }
            // check one row below
            if (targetRow === currentRow+1 && (targetCol === currentCol+1 || targetCol === currentCol-1)) return true;
        }
        else if (pieceType === CHECKERS_PIECES.PLAYER_2) {
            // check two rows above
            if (targetRow === currentRow-2) {
                if (targetCol === currentCol+2 && board[currentRow-1][currentCol+1] === CHECKERS_PIECES.PLAYER_1) return true;
                if (targetCol === currentCol-2 && board[currentRow-1][currentCol-1] === CHECKERS_PIECES.PLAYER_1) return true;
            }
            // check one row above
            if (targetRow === currentRow-1 && (targetCol === currentCol+1 || targetCol === currentCol-1)) return true;
        }
        return false;
    }

    static MOVE(board, pieceType, currentRow, currentCol, targetRow, targetCol) {
        board = this.COPY_BOARD(board);
        let jumpAgain = false;

        // player 1 jumps a piece
        if (pieceType === CHECKERS_PIECES.PLAYER_1) {
            if (targetRow === currentRow+2) {
                if (targetCol === currentCol+2) {
                    board[currentRow+1][currentCol+1] = CHECKERS_PIECES.EMPTY;
                    jumpAgain = this.CAN_JUMP_AGAIN(board, pieceType, targetRow, targetCol);
                }
                if (targetCol === currentCol-2) {
                    board[currentRow+1][currentCol-1] = CHECKERS_PIECES.EMPTY;
                    jumpAgain = this.CAN_JUMP_AGAIN(board, pieceType, targetRow, targetCol);
                }
            }
        }

        // player 2 jumps a piece 
        if (pieceType === CHECKERS_PIECES.PLAYER_2) {
            if (targetRow === currentRow-2) {
                if (targetCol === currentCol+2) {
                    board[currentRow-1][currentCol+1] = CHECKERS_PIECES.EMPTY;
                    jumpAgain = this.CAN_JUMP_AGAIN(board, pieceType, targetRow, targetCol);
                }
                if (targetCol === currentCol-2) {
                    board[currentRow-1][currentCol-1] = CHECKERS_PIECES.EMPTY;
                    jumpAgain = this.CAN_JUMP_AGAIN(board, pieceType, targetRow, targetCol);
                }
            }
        }

        board[currentRow][currentCol] = CHECKERS_PIECES.EMPTY;
        board[targetRow][targetCol] = pieceType
        return [board, jumpAgain];
    }

    static CAN_JUMP_AGAIN(board, pieceType, currentRow, currentCol){

        // check if player 1 can jump again 
        if (pieceType === CHECKERS_PIECES.PLAYER_1) {
            console.log(board);
            console.log(board[currentRow+2][currentCol-2]);
            console.log(CHECKERS_PIECES.EMPTY);
            console.log("I got Here " + board[currentRow+2][currentCol-2] === CHECKERS_PIECES.EMPTY)
            if (board[currentRow+1][currentCol+1] === CHECKERS_PIECES.PLAYER_2) {
                if (board[currentRow+2][currentCol+2] === CHECKERS_PIECES.EMPTY) return true;
            }
            if (board[currentRow+1][currentCol-1] === CHECKERS_PIECES.PLAYER_2) {
                console.log("I even got in here");
                if (board[currentRow+2][currentCol-2] === CHECKERS_PIECES.EMPTY) return true;
            }
        }

        // check if player 2 can jump again 
        return false
    }
}

export {
    CHECKERS,
    CHECKERS_PIECES
}