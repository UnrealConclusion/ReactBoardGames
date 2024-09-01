import { useState } from "react";

import styles from "./CheckersGame.module.css"
import CheckersBoard from "./CheckersBoard";
export default function CheckersGame() {
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.NORMAL); // track the stages of the game 
    const [board, setBoard] = useState(BOARD.SETUP(6, 7)); // representation of the current state of the board  

    return (
        <div className={styles.gameWindow}>
            <CheckersBoard/>
        </div>
    );
}