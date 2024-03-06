import { useAppSelector } from "../data/store.ts";
import { useSocket } from "../socket/useSocket.ts";

export function Waiting() {
  const gameUsers = useAppSelector((state) => state.game.users);
  const currentUser = useAppSelector((state) => state.game.currentUser);
  const { sendMessage } = useSocket();

  const handleStart = () => {
    sendMessage({ type: "StartGame" });
  };

  const handleToggleReady = () => {
    sendMessage({ type: "ToggleReady" });
  };

  return (
    <div>
      <h1>Waiting for players...</h1>
      <div>
        <b>Current players</b>
        {gameUsers.map((user) => (
          <div key={user.id}>
            {user.nickname} -{" "}
            <small>{user.isReady ? "Ready" : "Not ready"}</small>
          </div>
        ))}
      </div>
      <br />
      <div>Everyone is ready?</div>
      <button onClick={handleToggleReady}>
        {currentUser.isReady ? "Unready" : "Ready"}
      </button>
      <button onClick={handleStart}>Start game</button>
    </div>
  );
}
