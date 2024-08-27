import PropTypes from "prop-types";
import styles from "./TicTacToePiece.module.css";

import { Board } from "../../TicTacToe"

export default function TicTacToePiece({owner, activePlayer, hovered}) {
    if (owner === Board.PLAYER_1 || (hovered && activePlayer === Board.PLAYER_1 && owner === Board.EMPTY)) {
        return (
            <>
                <div className={`${styles.cross1} ${hovered && owner === Board.EMPTY ? styles.crossHovered : ""}`}/>
                <div className={`${styles.cross2} ${hovered && owner === Board.EMPTY ? styles.crossHovered : ""}`}/>
            </>
        );
    }
    else if (owner === Board.PLAYER_2 || (hovered && activePlayer === Board.PLAYER_2 && owner === Board.EMPTY)) {
        return (
            <>
                <div className={`${styles.circle} ${hovered && owner === Board.EMPTY ? styles.circleHovered : ""}`}/>
            </>
        );
    }

    return (
        <div/>
    );
}

TicTacToePiece.propTypes = {
    owner: PropTypes.number,
    activePlayer: PropTypes.number,
    hovered: PropTypes.bool
}