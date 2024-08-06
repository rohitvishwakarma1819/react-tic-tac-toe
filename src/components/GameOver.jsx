export default function GameOver({ winnerName, onRematchClicked }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winnerName && <p>{winnerName} won!</p>}
      {!winnerName && <p>It's a draw</p>}
      <button onClick={onRematchClicked}>Rematch!</button>
    </div>
  );
}
