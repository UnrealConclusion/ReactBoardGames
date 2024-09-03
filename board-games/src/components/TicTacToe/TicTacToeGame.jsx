import { useState } from "react";
import { GAME_STATUS, GAME_PIECES } from "../../magic_numbers";
import { BOARD } from "../../board";
import TIC_TAC_TOE from "./TicTacToe";
import Menu from "../Menu/Menu";
import {Board, BoardSpace} from "../Board";
import TicTacToePiece from "./TicTacToePiece";
import { useTurnCounter } from "../../hooks";
import styles from "./TicTacToeGame.module.css";

export default function TicTacToeGame() {
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.NORMAL);
    const [board, setBoard] = useState(BOARD.SETUP(TIC_TAC_TOE.NUM_ROWS, TIC_TAC_TOE.NUM_COLS));
    const [turnNumber, incrementTurn] = useTurnCounter(1);
    const activePlayer = turnNumber % 2 ? GAME_PIECES.PLAYER_1 : GAME_PIECES.PLAYER_2;
    const [mousePosition, setMousePosition] =  useState({row: -1, col: -1});  

    // reset the game 
    function handlePlayAgain() {
        setGameStatus(GAME_STATUS.NORMAL);
        setBoard(BOARD.SETUP(TIC_TAC_TOE.NUM_ROWS, TIC_TAC_TOE.NUM_COLS))
    }

    // update the board space that the mouse is in
    function handleMouseEnter(row, col) {
        setMousePosition({row: row, col: col})
    }
    // stop tracking mouse movement once the mouse exists the board 
    function handleMouseLeave() {
        setMousePosition({row: -1, col: -1})
    }

    // draw a piece on the board 
    function handleDraw(row, col) {
        if (gameStatus !== GAME_STATUS.NORMAL) return;  // game is over 
        if (!TIC_TAC_TOE.IS_EMPTY(board, row, col)) return; // space is occupy
        console.log("clicked")
        // draw the piece, update the board, and increment the turn 
        const newBoard = TIC_TAC_TOE.PLACE_PIECE(board, activePlayer, row, col);
        setBoard(newBoard);
        incrementTurn();

        if (TIC_TAC_TOE.IS_WINNER(newBoard, activePlayer)) {
            setGameStatus(activePlayer === GAME_PIECES.PLAYER_1 ? GAME_STATUS.PLAYER_1_WIN : GAME_STATUS.PLAYER_2_WIN);
        }
        else if (TIC_TAC_TOE.IS_FULL(newBoard)) {
            setGameStatus(GAME_STATUS.TIE);
        }
    }

    return  (
        <div className={styles.gameWindow}>
            {gameStatus !== GAME_STATUS.NORMAL && <Menu gameStatus={gameStatus} onPlayAgain={handlePlayAgain}/>}
            <Board className={styles.board} onMouseLeave={handleMouseLeave}>
                {board.map((rows, rowIndex) => rows.map((colValue, colIndex) => 
                    <BoardSpace 
                        className={styles.boardSpace} 
                        key={(rowIndex*board[0].length) + colIndex}
                        row={rowIndex}
                        col={colIndex}
                        onMouseEnter={handleMouseEnter}
                        onClick={handleDraw}
                    >
                        <TicTacToePiece
                            owner={colValue}
                            activePlayer={activePlayer}
                            isHovered={gameStatus === GAME_STATUS.NORMAL && mousePosition.col === colIndex && mousePosition.row === rowIndex}
                        />
                    </BoardSpace>
                ))}
            </Board>
        </div>
    );
}