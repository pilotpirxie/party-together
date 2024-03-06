import { useAppSelector } from "../data/store.ts";

export function Waiting() {
  const gameUsers = useAppSelector((state) => state.game.users);

  return (
    <div>
      <h1>Waiting for players...</h1>
      <div>
        <b>Current players</b>
        {gameUsers.map((user) => (
          <div key={user.id}>{user.nickname}</div>
        ))}
      </div>
      <br />
      <div>Everyone is ready?</div>
      <button>Start</button>
    </div>
  );
}
