import { useState } from "react";
import { GAME_STATUS } from "../../magic_numbers";
import Menu from "../Menu/Menu";
import styles from "./TicTacToeGame.module.css";

import { Board } from "./TicTacToe"
import { TicTacToeBoard } from "./components";

export default function TicTacToeGame() {
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.NORMAL);
    const [board, setBoard] = useState(Board.setup());

    function handlePlayAgain() {
        setGameStatus(GAME_STATUS.NORMAL);
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
                gameStatus={gameStatus}
            />
        </div>
    );
}