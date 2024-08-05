import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlater] = useState("X");

  function handleSquareSelect(rowIndex, colIndex) {
    setActivePlater((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updateGameTurns = [
        { square: { rowIndex, colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateGameTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"Player1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
          />
          <Player
            initialName={"Player2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSquareSelect={handleSquareSelect}
          activePlayerSymbol={activePlayer}
          turns={gameTurns}
        />
      </div>
      <Log logs={gameTurns} />
    </main>
  );
}

export default App;
