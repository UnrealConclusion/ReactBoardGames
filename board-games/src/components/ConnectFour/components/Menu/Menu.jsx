import PropTypes from 'prop-types'
import styles from "./Menu.module.css"
import Board from "../../ConnectFour";

/**
 * Menu to display after the game is over
 */
export default function Menu({gameStatus, onPlayAgain}) {
    let message = "There's a Tie!";
    if (gameStatus === Board.PLAYER_1_WIN) {
      message = "Player 1 Wins!";
    }
    else if (gameStatus === Board.PLAYER_2_WIN) {
      message = "Player 2 Wins!";
    }
  
    return (
      <div className={styles.menu}>
        <p>{message}</p>
        <button onClick={() => onPlayAgain()}>Play Again</button>
      </div>
    );
}

Menu.propTypes = {
    gameStatus: PropTypes.number, // the status of the game 
    onPlayAgain: PropTypes.func // onClick handler for the play again button
}