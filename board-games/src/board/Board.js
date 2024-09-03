import { GAME_PIECES } from "../magic_numbers";

/* Static class that provides various board operations */
export default class BOARD {

    /* return a new empty board with the specified number of rows and cols */
    static SETUP(rows, cols) {
        return Array(rows).fill().map(() => Array(cols).fill(GAME_PIECES.EMPTY));
    }

}