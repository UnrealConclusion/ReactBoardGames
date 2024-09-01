import PropTypes from 'prop-types'
import { GAME_STATUS } from "../../magic_numbers";
import styles from "./Menu.module.css"

/**
 * Menu to display after the game is over
 * - display a message based on the game status 
 * - takes a callback function to reset the game 
 */
export default function Menu({gameStatus, onPlayAgain}) {
    let message = "There's a Tie!";

    if (gameStatus === GAME_STATUS.PLAYER_1_WIN) {
      message = "Player 1 Wins!";
    }
    else if (gameStatus === GAME_STATUS.PLAYER_2_WIN) {
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
    gameStatus: PropTypes.number.isRequired, // the status of the game 
    onPlayAgain: PropTypes.func.isRequired // onClick handler for the play again button
}