import { useState } from "react";
import { GAME_STATUS } from "../../magic_numbers";
import Menu from "../Menu/Menu";
import styles from "./ConnectFourGame.module.css"
import Board from "./ConnectFour";
import { ConnectFourBoard } from "./components";


/**
 * Component controls the game window 
 */
export default function ConnectFourGame() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NORMAL); // track the stages of the game 
  const [board, setBoard] = useState(Board.setup()); // representation of the current state of the board 

  // reset the game 
  function handlePlayAgain() {
    setGameStatus(GAME_STATUS.NORMAL);
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