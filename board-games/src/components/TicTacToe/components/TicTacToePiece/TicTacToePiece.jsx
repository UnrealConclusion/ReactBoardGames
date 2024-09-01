import PropTypes from "prop-types";
import { GAME_PIECES } from "../../../../magic_numbers";
import styles from "./TicTacToePiece.module.css";

export default function TicTacToePiece({owner, activePlayer, hovered}) {
    if (owner === GAME_PIECES.PLAYER_1 || (hovered && activePlayer === GAME_PIECES.PLAYER_1 && owner === GAME_PIECES.EMPTY)) {
        return (
            <>
                <div className={`${styles.cross1} ${hovered && owner === GAME_PIECES.EMPTY ? styles.crossHovered : ""}`}/>
                <div className={`${styles.cross2} ${hovered && owner === GAME_PIECES.EMPTY ? styles.crossHovered : ""}`}/>
            </>
        );
    }
    else if (owner === GAME_PIECES.PLAYER_2 || (hovered && activePlayer === GAME_PIECES.PLAYER_2 && owner === GAME_PIECES.EMPTY)) {
        return (
            <>
                <div className={`${styles.circle} ${hovered && owner === GAME_PIECES.EMPTY ? styles.circleHovered : ""}`}/>
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