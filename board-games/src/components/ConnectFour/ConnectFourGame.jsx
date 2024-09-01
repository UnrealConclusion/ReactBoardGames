import { useState } from "react";
import { GAME_STATUS } from "../../magic_numbers";
import { BOARD } from "../../board"
import Menu from "../Menu/Menu";
import styles from "./ConnectFourGame.module.css"
import { ConnectFourBoard } from "./components";


/**
 * Component controls the game window 
 */
export default function ConnectFourGame() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NORMAL); // track the stages of the game 
  const [board, setBoard] = useState(BOARD.SETUP(6, 7)); // representation of the current state of the board 

  // reset the game 
  function handlePlayAgain() {
    setGameStatus(GAME_STATUS.NORMAL);
    setBoard(BOARD.SETUP(6, 7));
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