import { GAME_PIECES } from "../../magic_numbers";
import styles from "./ConnectFourPiece.module.css"
import PropTypes from "prop-types"

/**
 * Componenet renders a different style depending on which player owns the piece 
 * - displayes a piece if the mouse is currently hovering over the column
 */
export default function ConnectFourPiece({owner, activePlayer, isHovered}) {
    let type = styles.empty;
    if (owner === GAME_PIECES.PLAYER_1 || (isHovered && activePlayer === GAME_PIECES.PLAYER_1)) {
      type = styles.player1;
    }
    else if (owner === GAME_PIECES.PLAYER_2 || (isHovered && activePlayer === GAME_PIECES.PLAYER_2)) {
      type= styles.player2;
    }
    return (
      <div className={`${styles.boardPiece} ${type} ${isHovered ? styles.hovered : ""}`}/>
    );
}
  
ConnectFourPiece.propTypes = {
    owner: PropTypes.number, // the player who owns this piece
    activePlayer: PropTypes.number, // the player whose turn it currently is
    isHovered: PropTypes.bool // is the mouse hovering over this board space right now
}