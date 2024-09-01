import PropTypes from "prop-types";
import { GAME_PIECES } from "../../../../magic_numbers";
import { GAME_STATUS } from "../../../../magic_numbers";
import CONNECT_FOUR from "../../ConnectFour";
import styles from "./ConnectFourBoard.module.css";

import ConnectFourBoardSpace from "../ConnectFourBoardSpace/ConnectFourBoardSpace";
import { useState } from "react";

/**
 * Component controls the connect four board 
 */
export default function ConnectFourBoard({board, setBoard, gameStatus, setGameStatus}) {
    const [mousePosition, setMousePosition] =  useState(-1); // track the column that the mouse is hovering over
    const [turnNumber, setTurnNumber] = useState(1); // track number of turns 
    let activePlayer = turnNumber % 2 ? GAME_PIECES.PLAYER_1 : GAME_PIECES.PLAYER_2; // calculate which player's turn it is 

    // set mouse position to the column number
    function handleMouseEnterCol(col) {
      if (gameStatus !== GAME_STATUS.NORMAL) {
        setMousePosition(-1);
        return;
      }
      setMousePosition(col);
    }
  
    // set mouse position to -1 when it leaves the board 
    function handleMouseLeaveCol() {
      setMousePosition(-1);
    }
  
    // handle a new piece being dropped on the board 
    function handleColDrop(col) {
      // game is over 
      if (gameStatus !== GAME_STATUS.NORMAL) return;

      // make sure column is not already full 
      if (CONNECT_FOUR.isColFull(board, col)) return;
  
      if (CONNECT_FOUR.isWinMove(board, activePlayer, col)) setGameStatus(activePlayer === GAME_PIECES.PLAYER_1 ? GAME_STATUS.PLAYER_1_WIN : GAME_STATUS.PLAYER_2_WIN);
  
      const newBoard = CONNECT_FOUR.dropPiece(board, activePlayer, col);
      setBoard(newBoard); 
  
      if (CONNECT_FOUR.isBoardFull(newBoard)) setGameStatus(GAME_STATUS.TIE);
  
      setTurnNumber((i) => i+1);
    }
  
    return (
      <div className={styles.board} onMouseLeave={() => handleMouseLeaveCol()}>
        {board.map((row, rowIndex) => 
          row.map((colValue, colIndex) => 
            <ConnectFourBoardSpace
              key={(rowIndex*board[0].length) + colIndex}
              owner={colValue}
              col={colIndex}
              activePlayer={activePlayer}
              onMouseEnter={handleMouseEnterCol}
              onMouseLeave={handleMouseLeaveCol}
              onClick={handleColDrop}
              isHovered={
                colIndex === mousePosition && colValue === GAME_PIECES.EMPTY
                && (rowIndex === board.length-1 || (rowIndex < board.length-1 && board[rowIndex+1][colIndex] !== GAME_PIECES.EMPTY))
              }
            />
          )
        )}
      </div>
    );
}

ConnectFourBoard.propTypes = {
  board: PropTypes.array, // The current board 
  setBoard: PropTypes.func, // Setter for the board state
  activePlayer: PropTypes.number, // The player whose turn it is
  setTurn: PropTypes.func, // Setter for turn state
  gameStatus: PropTypes.number, // Current status of the game
  setGameStatus: PropTypes.func // Setter for game status state
}