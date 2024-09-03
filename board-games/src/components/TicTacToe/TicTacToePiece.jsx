import PropTypes from "prop-types";
import { GAME_PIECES } from "../../magic_numbers";
import styles from "./TicTacToePiece.module.css";

/**
 * Componenet renders a different style depending on which player owns the piece 
 * - displayes a piece if the mouse is currently hovering over the space
 */
export default function TicTacToePiece({owner, activePlayer, isHovered}) {
    if (owner === GAME_PIECES.PLAYER_1 || (isHovered && activePlayer === GAME_PIECES.PLAYER_1 && owner === GAME_PIECES.EMPTY)) {
        return (
            <>
                <div className={`${styles.cross1} ${isHovered && owner === GAME_PIECES.EMPTY ? styles.crossHovered : ""}`}/>
                <div className={`${styles.cross2} ${isHovered && owner === GAME_PIECES.EMPTY ? styles.crossHovered : ""}`}/>
            </>
        );
    }
    else if (owner === GAME_PIECES.PLAYER_2 || (isHovered && activePlayer === GAME_PIECES.PLAYER_2 && owner === GAME_PIECES.EMPTY)) {
        return (
            <>
                <div className={`${styles.circle} ${isHovered && owner === GAME_PIECES.EMPTY ? styles.circleHovered : ""}`}/>
            </>
        );
    }

    return (
        <div/>
    );
}

TicTacToePiece.propTypes = {
    owner: PropTypes.number, // player that owns the piece
    activePlayer: PropTypes.number, // the player whose turn it currently is 
    isHovered: PropTypes.bool // is the mouse hovering over this space right now
}