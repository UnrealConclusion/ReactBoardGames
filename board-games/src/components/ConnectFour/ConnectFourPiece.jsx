import { GAME_PIECES } from "../../magic_numbers";
import styles from "./ConnectFourPiece.module.css"
import PropTypes from "prop-types"

/**
 * Componenet renders a different style depending on which player owns the piece 
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
    owner: PropTypes.number,
    activePlayer: PropTypes.number,
    isHovered: PropTypes.bool
}