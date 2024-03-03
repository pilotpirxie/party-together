import {useSocket} from "../../socket/useSocket.ts";
import {useState} from "react";

function App() {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(0);
  const [code, setCode] = useState("");

  const {connect, disconnect, sendMessage, stompClient} = useSocket();

  const handleSendMessage = () => {
    sendMessage({ type: "Join", payload: { nickname, avatar, code } }, {});
  }

  const handlePing = () => {
    sendMessage({ type: "Ping", payload: {} }, {});
  }

  return (
    <div>
      <h1>{stompClient?.connected ? "Connected" : "Not connected"}</h1>
      <button onClick={() => connect()}>Join</button>
      <button onClick={() => disconnect()}>Disconnect</button>
      <br />
      <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input type="number" value={avatar} onChange={(e) => setAvatar(parseInt(e.target.value))} />
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
      <button onClick={handlePing}>Ping</button>
    </div>
  );
}

export default App;
