import { useState } from "react";
import PropTypes from "prop-types";
import { GAME_STATUS } from "../../../../magic_numbers";
import styles from "./TicTacToeBoard.module.css";

import TicTacToeBoardSpace from "../TicTacToeBoardSpace/TicTacToeBoardSpace";
import { Board } from "../../TicTacToe"

export default function TicTacToeBoard({board, setBoard, gameStatus, setGameStatus}) {
    const [turn, setTurn] = useState(1); // track number of turns 
    let activePlayer = turn % 2 ? Board.PLAYER_1 : Board.PLAYER_2; // calculate which player's turn it is 

    // drop a piece onto the board
    function handleDrop(x, y) {
        if (gameStatus !== GAME_STATUS.NORMAL) return;
        if (!Board.isEmpty(board, x, y)) return
        const newBoard = Board.placePiece(board, activePlayer, x, y);
        setBoard(newBoard);
        const win = Board.isWinner(newBoard, activePlayer);
        if (win) {
            setGameStatus(activePlayer === Board.PLAYER_1 ? GAME_STATUS.PLAYER_1_WIN : GAME_STATUS.PLAYER_2_WIN);
        }
        else if (Board.isFull(newBoard)) {
            setGameStatus(GAME_STATUS.TIE);
        }
        setTurn((current) => current+1);
    }

    return (
        <div className={styles.board}>
            {board.map((row, rowIndex) => 
                row.map((colValue, colIndex) => 
                    <TicTacToeBoardSpace
                        key={(rowIndex*board[0].length) + (colIndex)}
                        owner={colValue}
                        activePlayer={activePlayer}
                        row={rowIndex}
                        col={colIndex}
                        onDrop={handleDrop}
                        gameStatus={gameStatus}
                    />
                )
            )}
        </div>
    );
}

TicTacToeBoard.propTypes = {
    board: PropTypes.array, // array representing the state of the board
    setBoard: PropTypes.func, // setter function for board
    gameStatus: PropTypes.number, // current state of the game
    setGameStatus: PropTypes.func // setter function for game status
}