import { useState } from "react";
import { GAME_STATUS, GAME_PIECES } from "../../magic_numbers";
import { BOARD } from "../../board"
import CONNECT_FOUR from "./ConnectFour";
import Menu from "../Menu/Menu";
import {Board, BoardSpace} from "../Board";
import ConnectFourPiece from "./ConnectFourPiece";
import { useTurnCounter } from "../../hooks";
import styles from "./ConnectFourGame.module.css"

/**
 * Connect Four Game Component 
 */
export default function ConnectFourGame() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NORMAL);
  const [board, setBoard] = useState(BOARD.SETUP(6, 7)); 
  const [turnNumber, incrementTurn] = useTurnCounter(1);
  const activePlayer = turnNumber % 2 ? GAME_PIECES.PLAYER_1 : GAME_PIECES.PLAYER_2;
  const [mousePosition, setMousePosition] =  useState({row: -1, col: -1}); 

  // reset the game 
  function handlePlayAgain() {
    setGameStatus(GAME_STATUS.NORMAL);
    setBoard(BOARD.SETUP(6, 7));
  }

  // update the board space that the mouse is in
  function handleMouseEnter(row, col) {
    setMousePosition({row: row, col: col})
  }
  // stop tracking mouse movement once the mouse exists the board 
  function handleMouseLeave() {
    setMousePosition({row: -1, col: -1})
  }

  // drop a piece onto the board 
  function handleDrop(row, col) {
    if (gameStatus !== GAME_STATUS.NORMAL) return;  // game is over 
    if (CONNECT_FOUR.IS_COL_FULL(board, col)) return; // make sure column is not already full 

    // check if the move allows the player to win
    if (CONNECT_FOUR.IS_WIN_MOVE(board, activePlayer, col)) {
      setGameStatus(activePlayer === GAME_PIECES.PLAYER_1 ? GAME_STATUS.PLAYER_1_WIN : GAME_STATUS.PLAYER_2_WIN)
    } 

    // drop the piece, update the board, and increment the turn 
    const newBoard = CONNECT_FOUR.DROP_PIECE(board, activePlayer, col);
    setBoard(newBoard); 
    incrementTurn();

    // check for a tie 
    if (CONNECT_FOUR.IS_BOARD_FULL(newBoard)) setGameStatus(GAME_STATUS.TIE);
  }

  return (
    <main className={styles.gameWindow}>
      {gameStatus !== 0 && <Menu gameStatus={gameStatus} onPlayAgain={handlePlayAgain}/>}
      <Board className={styles.board} onMouseLeave={handleMouseLeave}>
        {board.map((rows, rowIndex) => rows.map((colValue, colIndex) => 
          <BoardSpace 
            className={styles.boardSpace}
            key={(rowIndex*board[0].length) + colIndex}
            row={rowIndex}
            col={colIndex}
            onMouseEnter={handleMouseEnter}
            onClick={handleDrop}
          >
            <ConnectFourPiece
              owner={colValue}
              activePlayer={activePlayer}
              isHovered={gameStatus === GAME_STATUS.NORMAL && mousePosition.col === colIndex && CONNECT_FOUR.FIND_EMPTY_ROW(board, mousePosition.col) === rowIndex}
            />
          </BoardSpace>
        ))}
      </Board>
    </main>
  );
}