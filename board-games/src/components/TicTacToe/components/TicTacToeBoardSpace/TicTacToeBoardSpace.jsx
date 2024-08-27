import { useState } from "react";
import PropTypes from "prop-types";
import { GAME_STATUS } from "../../../../magic_numbers";
import styles from "./TicTacToeBoardSpace.module.css";

import TicTacToePiece from "../TicTacToePiece/TicTacToePiece"

export default function TicTacToeBoardSpace({owner, activePlayer, row, col, onDrop, gameStatus}) {
    const [hovered, setHovered] = useState(false);

    function handleMouseEnter() {
        if (gameStatus !== GAME_STATUS.NORMAL) {
            setHovered(false);
            return
        }
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

TicTacToeBoardSpace.propTypes = {
    owner: PropTypes.number, 
    activePlayer: PropTypes.number, 
    row: PropTypes.number, 
    col: PropTypes.number, 
    onDrop: PropTypes.func,
    gameStatus: PropTypes.number
}