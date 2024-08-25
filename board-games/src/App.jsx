import './App.css'
import { ConnectFourGame, TicTacToeGame } from "./components";
import { GamePage, HomePage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="connect-four" element={<GamePage><ConnectFourGame/></GamePage>}/>
          <Route path="tic-tac-toe" element={<GamePage><TicTacToeGame/></GamePage>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
