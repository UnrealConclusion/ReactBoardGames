import { CHECKERS_PIECES } from "./Checkers";
import styles from "./CheckersPiece.module.css"; 

export default function CheckersPiece({owner, draggable, onDragEnd}) {
    return (
        <div className={`${owner === CHECKERS_PIECES.PLAYER_1 ? styles.player1 : styles.player2} ${draggable ? styles.draggable : ""}`} 
            draggable={draggable}
            onDragEnd={onDragEnd}
        />
    );
}