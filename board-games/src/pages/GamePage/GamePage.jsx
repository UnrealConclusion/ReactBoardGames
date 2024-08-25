import styles from "./GamePage.module.css"

export default function GamePage({children}) {

    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}