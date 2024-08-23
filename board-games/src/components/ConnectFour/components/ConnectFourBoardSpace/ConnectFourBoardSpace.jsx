import PropTypes from "prop-types"
import styles from "./ConnectFourBoardSpace.module.css"
import ConnectFourPiece from "../ConnectFourPiece/ConnectFourPiece";

/**
 * Component used to control a single space on the grid 
 */
export default function ConnectFourBoardSpace({owner, col, activePlayer, onMouseEnter, onClick, isHovered}) {
    return (
      <div className={styles.boardSpace} onMouseEnter={() => onMouseEnter(col)} onClick={() => onClick(col)}>
        <ConnectFourPiece
          owner={owner}
          activePlayer={activePlayer}
          isHovered={isHovered}
        />
      </div>
    );
}

ConnectFourBoardSpace.propTypes = {
  owner: PropTypes.number, // the player's whose piece is on the board
  col: PropTypes.number, // column that the space is in
  activePlayer: PropTypes.number, // whose turn it is 
  onMouseEnter: PropTypes.func, // handler function for when mouse enters the space
  onClick: PropTypes.func, // handler function for when the space is clicked
  isHovered: PropTypes.bool // is the column being hovered over 
}