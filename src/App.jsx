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

function deriveWinner(gameBoard, players) {
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
      return players[firstSquareSymbol];
    }
  }
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((row) => [...row])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { colIndex, rowIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const hasDraw = !winner && gameTurns.length === 9;

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

  function onRestart() {
    setGameTurns([]);
  }

  function onPlayerNameChange(newName, symbol) {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onPlayerNameChange={onPlayerNameChange}
          />
          <Player
            initialName={players.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onPlayerNameChange={onPlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winnerName={winner} onRestart={onRestart} />
        )}
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
