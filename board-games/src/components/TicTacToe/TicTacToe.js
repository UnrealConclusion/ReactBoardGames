class Board {
    static EMPTY = 0;
    static PLAYER_1 = 1;
    static PLAYER_2 = 2;

    static setup() {
        return [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }

    // check if a space is empty
    static isEmpty(board, x, y) {
        return board[x][y] === Board.EMPTY;
    }

    static isFull(board) {
        return board.every((row) => 
            row.every((colValue) => colValue !== this.EMPTY)
        );
    }

    // return a new board with a new piece placed on it 
    static placePiece(board, activePlayer, x, y) {
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
    static isWinner(board, activePlayer) {
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

export {
    Board
}