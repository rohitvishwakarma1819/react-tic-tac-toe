import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-compbinations";
import GameOver from "./components/Gameover";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function isGameOver(gameBoard) {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol == thirdSquareSymbol
    ) {
      return firstSquareSymbol;
    }
  }
  return undefined;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  let winner;
  let hasDraw;
  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { colIndex, rowIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }

  winner = isGameOver(gameBoard);
  hasDraw = !winner && gameTurns.length === 9;

  function handleSquareSelect(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
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
        {(winner || hasDraw) && <GameOver winnerName={winner} />}
        <GameBoard
          onSquareSelect={handleSquareSelect}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log logs={gameTurns} />
    </main>
  );
}

export default App;
