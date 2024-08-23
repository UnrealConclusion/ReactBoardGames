import { useState } from "react";
import styles from "./ConnectFourGame.module.css"
import Board from "./ConnectFour";
import { Menu } from "./components";

export default function ConnectFourGame() {
  const [gameStatus, setGameStatus] = useState(Board.PLAY); // track the stages of the game 
  const [board, setBoard] = useState(Board.setup()); // representation of the current state of the board 
  const [turn, setTurn] = useState(1); // track number of turns 
  let activePlayer = turn % 2 ? Board.PLAYER_1 : Board.PLAYER_2; // calculate which player's turn it is 

  // reset the game 
  function handlePlayAgain() {
    setGameStatus(Board.PLAY);
    setBoard(Board.setup());
  }

  return (
    <div className={styles.gameWindow}>
      {gameStatus !== 0 && <Menu gameStatus={gameStatus} onPlayAgain={handlePlayAgain}/>}
      <ConnectFourBoard
        board={board}
        setBoard={setBoard}
        activePlayer={activePlayer}
        setTurn={setTurn}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
    </div>
  );
}

function ConnectFourBoard({board, setBoard, activePlayer, setTurn, gameStatus, setGameStatus}) {
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

function ConnectFourBoardSpace({owner, col, activePlayer, onMouseEnter, onClick, isHovered}) {
  return (
    <div className={styles.boardSpace} onMouseEnter={() => onMouseEnter(col)} onClick={() => onClick(col)}>
      <ConnectFourPiece
        owner={owner}
        activePlayer={activePlayer}
        isHovered={isHovered}
      />
    </div>
  );
}

/**
 * A single piece on the board 
 */
function ConnectFourPiece({owner, activePlayer, isHovered}) {
  let type = styles.empty;
  if (owner === Board.PLAYER_1 || (isHovered && activePlayer === Board.PLAYER_1)) {
    type = styles.player1;
  }
  else if (owner === Board.PLAYER_2 || (isHovered && activePlayer === Board.PLAYER_2)) {
    type= styles.player2;
  }
  return (
    <div className={`${styles.boardPiece} ${type} ${isHovered ? styles.hovered : ""}`}/>
  );
}