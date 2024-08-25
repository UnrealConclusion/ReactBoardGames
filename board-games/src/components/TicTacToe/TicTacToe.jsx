import styles from "./TicTacToe.module.css";
import { useState } from "react";
import Menu from "../ConnectFour/components/Menu/Menu";

export default function TicTacToe() {
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.NORMAL);
    const [winCondition, setWinCondition] = useState(null);
    const [board, setBoard] = useState(Board.setup());

    function handlePlayAgain() {
        setGameStatus(GAME_STATUS.NORMAL);
        setWinCondition(null);
        setBoard(Board.setup())
    }

    return  (
        <div className={styles.window}>
            { gameStatus !== GAME_STATUS.NORMAL &&
                <Menu 
                    gameStatus={gameStatus}
                    onPlayAgain={handlePlayAgain}
                />
            }
            <TicTacToeBoard
                board={board}
                setBoard={setBoard}
                setGameStatus={setGameStatus}
                winCondition={winCondition}
                setWinCondition={setWinCondition}
            />
        </div>
    );
}

function TicTacToeBoard({board, setBoard, setGameStatus, winCondition, setWinCondition}) {
    const [turn, setTurn] = useState(1); // track number of turns 
    let activePlayer = turn % 2 ? Board.PLAYER_1 : Board.PLAYER_2; // calculate which player's turn it is 

    // drop a piece onto the board
    function handleDrop(x, y) {
        if (!Board.isEmpty(board, x, y)) return
        const newBoard = Board.placePiece(board, activePlayer, x, y);
        setBoard(newBoard);
        const win = Board.isWinner(newBoard, activePlayer);
        if (win) {
            setGameStatus(activePlayer === Board.PLAYER_1 ? GAME_STATUS.PLAYER_1_WIN : GAME_STATUS.PLAYER_2_WIN);
            setWinCondition(win);
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
                        winCondition={winCondition}
                    />
                )
            )}
        </div>
    );
}

function TicTacToeBoardSpace({owner, activePlayer, row, col, onDrop}) {
    const [hovered, setHovered] = useState(false);

    function handleMouseEnter() {
        setHovered(true);
    }

    function handleMouseLeaver() {
        setHovered(false)
    }
    
    return (
        <div className={styles.boardSpace} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeaver()} onClick={() => onDrop(row, col)}>
            <TicTacToePiece
                owner={owner}
                hovered={hovered}
                activePlayer={activePlayer}
            />
        </div>
    );
}

function TicTacToePiece({owner, activePlayer, hovered}) {
    if (owner === Board.PLAYER_1 || (hovered && activePlayer === Board.PLAYER_1 && owner === Board.EMPTY)) {
        return (
            <>
                <div className={`${styles.cross1} ${hovered && owner === Board.EMPTY ? styles.crossHovered : ""}`}/>
                <div className={`${styles.cross2} ${hovered && owner === Board.EMPTY ? styles.crossHovered : ""}`}/>
            </>
        );
    }
    else if (owner === Board.PLAYER_2 || (hovered && activePlayer === Board.PLAYER_2 && owner === Board.EMPTY)) {
        return (
            <>
                <div className={`${styles.circle} ${hovered && owner === Board.EMPTY ? styles.circleHovered : ""}`}/>
            </>
        );
    }

    return (
        <div/>
    );
}

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

// static class that contains a list of game status 
class GAME_STATUS {
    static NORMAL = 0;
    static PLAYER_1_WIN = 1;
    static PLAYER_2_WIN = 2;
    static TIE = 3;
}