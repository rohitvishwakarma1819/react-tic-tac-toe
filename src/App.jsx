import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
function App() {
  const [activePlayer, setActivePlater] = useState("X");

  function handleSquareSelect() {
    setActivePlater((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));
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
        />
      </div>
    </main>
  );
}

export default App;
