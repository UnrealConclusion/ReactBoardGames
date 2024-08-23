import PropTypes from "prop-types";
import styles from "./ConnectFourBoard.module.css";
import Board from "../../ConnectFour";
import ConnectFourBoardSpace from "../ConnectFourBoardSpace/ConnectFourBoardSpace";
import { useState } from "react";

/**
 * Component controls the connect four board 
 */
export default function ConnectFourBoard({board, setBoard, activePlayer, setTurn, gameStatus, setGameStatus}) {
    const [mousePosition, setMousePosition] =  useState(-1); // track the column that the mouse is hovering over
  
    // set mouse position to the column number
    function handleMouseEnterCol(col) {
      if (gameStatus !== Board.PLAY) {
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
      if (gameStatus !== Board.PLAY) return;

      // make sure column is not already full 
      if (Board.isColFull(board, col)) return;
  
      if (Board.isWinMove(board, activePlayer, col)) setGameStatus(activePlayer === Board.PLAYER_1 ? Board.PLAYER_1_WIN : Board.PLAYER_2_WIN);
  
      const newBoard = Board.dropPiece(board, activePlayer, col);
      setBoard(newBoard); 
  
      if (Board.isBoardFull(newBoard)) setGameStatus(Board.TIE);
  
      setTurn((i) => i+1);
    }
  
    return (
      <div className={styles.board} onMouseLeave={() => handleMouseLeaveCol()}>
        {board.map((row, rowIndex) => 
          row.map((colValue, colIndex) => 
            <ConnectFourBoardSpace
              key={colIndex}
              owner={colValue}
              col={colIndex}
              activePlayer={activePlayer}
              onMouseEnter={handleMouseEnterCol}
              onMouseLeave={handleMouseLeaveCol}
              onClick={handleColDrop}
              isHovered={
                colIndex === mousePosition && colValue === Board.EMPTY
                && (rowIndex === board.length-1 || (rowIndex < board.length-1 && board[rowIndex+1][colIndex] !== Board.EMPTY))
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