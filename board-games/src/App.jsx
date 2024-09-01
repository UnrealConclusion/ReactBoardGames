import './App.css'
import { ConnectFourGame, TicTacToeGame } from "./components";
import CheckersGame from './components/Checkers/CheckersGame';
import { GamePage, HomePage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/ReactBoardGames" element={<HomePage/>}/>
          <Route path="/ReactBoardGames/connect-four" element={<GamePage><ConnectFourGame/></GamePage>}/>
          <Route path="/ReactBoardGames/tic-tac-toe" element={<GamePage><TicTacToeGame/></GamePage>}/>
          <Route path="/ReactBoardGames/checkers" element={<GamePage><CheckersGame/></GamePage>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
