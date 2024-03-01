import {useSocket} from "../../socket/useSocket.ts";
import {useState} from "react";

function App() {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(0);
  const [gameId, setGameId] = useState("");

  const {connect, sendMessage, stompClient} = useSocket();

  const handleJoin = () => {
    connect();
  }

  const handleSendMessage = () => {
    sendMessage({ type: "Join", payload: { nickname, avatar, gameId } }, {});
  }

  return (
    <div>
      <h1>{stompClient?.connected ? "Connected" : "Not connected"}</h1>
      <button onClick={handleJoin}>Join</button>
      <br />
      <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input type="number" value={avatar} onChange={(e) => setAvatar(parseInt(e.target.value))} />
      <input type="text" value={gameId} onChange={(e) => setGameId(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default App;
