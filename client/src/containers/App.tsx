import { useSocket } from "../socket/useSocket.ts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const [nickname, setNickname] = useState(
    "Player" + Math.floor(Math.random() * 100),
  );
  const [avatar, setAvatar] = useState(0);
  const [code, setCode] = useState("");

  const { connect, stompClient } = useSocket();
  const location = useLocation();

  const handleSendMessage = () => {
    connect({
      nickname,
      avatar,
      code,
    });
  };

  useEffect(() => {
    if (location.state?.code) {
      setCode(location.state.code);
    }
  }, [location.state]);

  return (
    <div>
      <h1>{stompClient?.connected ? "Connected" : "Not connected"}</h1>
      <br />
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="number"
        value={avatar}
        onChange={(e) => setAvatar(parseInt(e.target.value))}
      />
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default App;
