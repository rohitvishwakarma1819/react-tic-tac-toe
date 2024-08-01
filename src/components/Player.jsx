import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span>}
        {isEditing && <input onChange={() => (name = value)}></input>}
        <span className="player-symbol">{symbol}</span>
      </span>

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
