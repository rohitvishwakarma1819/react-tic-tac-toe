export default function GameOver({ winnerName, onRematchClicked }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winnerName} won!</p>
      <button onClick={onRematchClicked}>Rematch!</button>
    </div>
  );
}
