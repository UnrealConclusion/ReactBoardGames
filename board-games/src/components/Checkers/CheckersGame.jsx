import { useRef, useState } from "react";
import { GAME_STATUS } from "../../magic_numbers";
import { CHECKERS, CHECKERS_PIECES } from "./Checkers";
import { Board, BoardSpace } from "../Board";
import CheckersPiece from "./CheckersPiece";
import { useTurnCounter } from "../../hooks";
import styles from "./CheckersGame.module.css"
import { BOARD } from "../../board";

export default function CheckersGame() {
    const [board, setBoard] = useState(CHECKERS.SETUP_CHECKER_BOARD()); 
    const [turnNumber, incrementTurn] = useTurnCounter(1);
    const activePlayer = turnNumber % 2 ? CHECKERS_PIECES.PLAYER_1 : CHECKERS_PIECES.PLAYER_2;
    const [startPosition, setStartPosition] =  useState(null);  

    function handleDragStart(row, col) {
        console.log("start dragging at row: " + row + ", " + col);
        setStartPosition({row: row, col: col});
    }

    function handleDrop(row, col) {
        console.log("Dropping on row: " + row + ", col: " + col);
        if (CHECKERS.IS_VALID_MOVE(board, activePlayer, startPosition.row, startPosition.col, row, col)) {
            const [newBoard, jumpAgain] = CHECKERS.MOVE(board, activePlayer, startPosition.row, startPosition.col, row, col);
            setBoard(newBoard);
            if (!jumpAgain){
                incrementTurn();
            }
        }
        setStartPosition(null);
    }

    function handleDragEnd() {
        setStartPosition(null);
    }

    return (
        <div className={styles.gameWindow}>
            <Board className={styles.board}>
                {board.map((rows, rowIndex) => rows.map((colValue, colIndex) => 
                    <BoardSpace 
                        className={`${styles.boardSpace} ${colValue !== -1  ? styles.activeSpace : ""} ${startPosition && CHECKERS.IS_VALID_MOVE(board, activePlayer, startPosition.row, startPosition.col, rowIndex, colIndex) ? styles.validSpace : ""}`}
                        key={(rowIndex*board[0].length) + colIndex}
                        row={rowIndex}
                        col={colIndex}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    >
                        {colValue !== CHECKERS_PIECES.VOID && colValue !== CHECKERS_PIECES.EMPTY ? 
                            <CheckersPiece owner={colValue} draggable={activePlayer === colValue} onDragEnd={handleDragEnd}/> 
                            : ""
                        }
                    </BoardSpace>
                ))}
            </Board>
        </div>
    );
}

