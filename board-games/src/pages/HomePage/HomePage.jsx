import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import connectFour from "../../assets/connect-four.png";
import ticTacToe from "../../assets/tic-tac-toe.png";

export default function HomePage() {
    return (
        <div className={styles.container}>
            <CardShelf>
                <Link to="/ReactBoardGames/connect-four"><Card title="Connect Four" image={connectFour}/></Link>
                <Link to="/ReactBoardGames/tic-tac-toe"><Card title="Tic Tac Toe" image={ticTacToe}/></Link>
                <Link to="/ReactBoardGames/checkers"><Card title="Checkers"/></Link>
            </CardShelf>
        </div>
    );
}

function CardShelf({children}) {
    return (
        <div className={styles.cardShelf}>
            {children}
        </div>
    );
}

function Card({title, image}) {
    return (
        <div className={styles.card}>
            <p>{title}</p>
            <div
                className={styles.image}
                style={{backgroundImage: `url(${image})`}}
            />
        </div>
    );
}