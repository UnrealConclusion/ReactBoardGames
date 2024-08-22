import { useState } from 'react'
import './App.css'

const EMPTY = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;

function App() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]);
  const [turn, setTurn] = useState(1);
  const [mousePosition, setMousePosition] = useState(-1); 

  // calculate which player's turn it is
  const player = turn % 2 === 0 ? PLAYER_2 : PLAYER_1

  // place a piece on the board if possible 
  function handleClick(col) {
    // check that column is not full 
    if (board[0][col] !== EMPTY){
      return
    }

    // add piece to board 
    setBoard((current) => 
      current.map((rowValue, rowIndex) => 
        rowValue.map((colValue, colIndex) => {
          if (colValue === EMPTY && colIndex === col && (rowIndex === board.length-1 || current[rowIndex+1][colIndex] !== EMPTY)){
            return player
          }
          else {
            return colValue
          }
        })));

    // increment turn
    setTurn((current) => current + 1); 
  }

  // tracks the column that the mouse is hovered over
  function handleMouseEnter(col) {
    setMousePosition(col);
  }
  function handleMouseLeave() {
    setMousePosition(-1);
  }

  return (
    <>
      <div className='board'>
        {
          board.map((row, i) => 
            row.map((col, j) => 
              <BoardSpace 
                key={j} 
                board={board}
                row={i} 
                col={j} 
                owner={col}
                player={player}
                mousePosition={mousePosition}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
              />))
        }
      </div>
    </>
  )
}

/**
 * A single board space on the board (grid)
 */
function BoardSpace({board, row, col, owner, player, mousePosition, onMouseEnter, onMouseLeave, onClick}) {
  let isHovered = false;
  if (mousePosition === col && owner === EMPTY && (row === board.length-1 || board[row+1][col] !== 0)) {
    isHovered = true;
  }

  return (
    <div 
      className='board-space' 
      onMouseEnter={() => onMouseEnter(col)} 
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onClick(col)}
    >
      <BoardPiece owner={owner} player={player} isHovered={isHovered}/>
    </div>
  );
}

/**
 * A piece (disk) on the board  
 */
function BoardPiece({owner, player, isHovered}) {
  if (isHovered) {
    return <div className={`board-piece ${player === PLAYER_1 ? "red" : "yellow"}`}/>
  }

  // style the piece based on who it belongs to 
  let piece = "empty";
  if (owner === 1) {
    piece = "red";
  }
  else if (owner === 2) {
    piece = "yellow"
  }

  return (
    <div className={`board-piece ${piece}`}/>
  );
}

export default App
