import { useState } from "react";
import styles from "./ConnectFourGame.module.css"
import Board from "./ConnectFour";
import { ConnectFourBoard, Menu } from "./components";

/**
 * Component controls the game window 
 */
export default function ConnectFourGame() {
  const [gameStatus, setGameStatus] = useState(Board.PLAY); // track the stages of the game 
  const [board, setBoard] = useState(Board.setup()); // representation of the current state of the board 

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
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
    </div>
  );
}