import { useState } from "react";
import { GAME_STATUS, GAME_PIECES } from "../../magic_numbers";
import { BOARD } from "../../board";
import CHECKERS from "./Checkers";
import { Board, BoardSpace } from "../Board";
import styles from "./CheckersGame.module.css"

/**
 * initalize the checker board to the starting state
 * - place all the piece on the board 
 * - mark all the inactive squares you can't move on 
 */
function SETUP_CHECKER_BOARD(board){
    for (let i=0; i<board.length; i++) {
        if (i % 2 !== 0) {
            for (let j=0; j<board[i].length; j++){
                if (j % 2 !== 0) {
                    board[i][j] = -1;
                }
                else if (i < 3) {
                    board[i][j] = GAME_PIECES.PLAYER_1
                }
                else if (i > 4) {
                    board[i][j] = GAME_PIECES.PLAYER_2
                }
            }
        }
        else {
            for (let j=0; j<board[i].length; j++){
                if (j % 2 === 0) {
                    board[i][j] = -1
                }
                else if (i < 3) {
                    board[i][j] = GAME_PIECES.PLAYER_1
                }
                else if (i > 4) {
                    board[i][j] = GAME_PIECES.PLAYER_2
                }
            }
        }
    }
    return board;
}

export default function CheckersGame() {
    const [board, setBoard] = useState(SETUP_CHECKER_BOARD(BOARD.SETUP(CHECKERS.NUM_ROWS, CHECKERS.NUM_COLS))); 
    console.log(board)
    return (
        <div className={styles.gameWindow}>
            <Board className={styles.board}>
                {board.map((rows, rowIndex) => rows.map((colValue, colIndex) => 
                    <BoardSpace 
                        className={`${styles.boardSpace} ${colValue !== -1  ? styles.activeSpace : ""}`}
                        key={(rowIndex*board[0].length) + colIndex}
                        row={rowIndex}
                        col={colIndex}
                    >
                    </BoardSpace>
                ))}
            </Board>
        </div>
    );
}

