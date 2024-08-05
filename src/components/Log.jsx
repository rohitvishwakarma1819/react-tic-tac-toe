export default function Log({ logs }) {
  return (
    <ol id="log">
      {logs.map((log) => (
        <li key={`${log.square.rowIndex}${log.square.colIndex}`}>
          {log.player} Selected {log.square.rowIndex}, {log.square.colIndex}
        </li>
      ))}
    </ol>
  );
}
