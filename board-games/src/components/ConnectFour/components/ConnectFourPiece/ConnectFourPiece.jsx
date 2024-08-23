import PropTypes from 'prop-types'
import styles from "./ConnectFourPiece.module.css"
import Board from "../../ConnectFour";

/**
 * A single piece on the board 
 */
export default function ConnectFourPiece({owner, activePlayer, isHovered}) {
    let type = styles.empty;
    if (owner === Board.PLAYER_1 || (isHovered && activePlayer === Board.PLAYER_1)) {
      type = styles.player1;
    }
    else if (owner === Board.PLAYER_2 || (isHovered && activePlayer === Board.PLAYER_2)) {
      type= styles.player2;
    }
    return (
      <div className={`${styles.boardPiece} ${type} ${isHovered ? styles.hovered : ""}`}/>
    );
}

ConnectFourPiece.propTypes = {
  owner: PropTypes.number, // the player's whose piece is on the board
  activePlayer: PropTypes.number, // whose turn it is 
  isHovered: PropTypes.bool // is the column being hovered over 
}