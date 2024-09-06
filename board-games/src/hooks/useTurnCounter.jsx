import { useState } from "react";

/* Hook used to count the number of turns that has passed  */
export default function useTurnTracker(initialCount) {
    const [turnNumber, setTurnNumber] = useState(initialCount);

    function incrementTurn() {
        setTurnNumber((currentTurnNumber) => currentTurnNumber+1);
    }

    return [turnNumber, incrementTurn]
}