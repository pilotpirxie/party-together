import { useSocket } from "../socket/useSocket.ts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const [nickname, setNickname] = useState(
    "Player" + Math.floor(Math.random() * 100),
  );
  const [avatar, setAvatar] = useState(Math.floor(Math.random() * 83));
  const [code, setCode] = useState("");

  const { connect, stompClient } = useSocket();
  const location = useLocation();

  const handleJoinGame = () => {
    if (!nickname || !code) {
      return;
    }

    connect({
      nickname,
      avatar,
      code,
    });
  };

  const handleCreateGame = () => {
    if (!nickname) {
      return;
    }

    connect({
      nickname,
      avatar,
      code: "",
    });
  };

  const handleRollAvatar = () => {
    setAvatar(Math.floor(Math.random() * 83));
  };

  useEffect(() => {
    if (location.state?.code) {
      setCode(location.state.code);
    }
  }, [location.state]);

  return (
    <div className="bg-info vh-100">
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <div className="card card-body">
              <div className="text-center">
                <h1>🦄 Party Together</h1>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={handleRollAvatar}
              >
                <img
                  src={"/avatars/" + avatar + ".png"}
                  alt="avatar"
                  className="img rounded-circle bg-secondary"
                  style={{ width: "150px", height: "150px" }}
                />
                <div>
                  <i className="ri-refresh-line" /> Roll avatar
                </div>
              </div>
              <label>Nickname</label>
              <input
                className="form-control"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <label className="mt-3">Game code</label>
              <input
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="btn btn-warning text-black fw-bold mt-3"
                onClick={handleJoinGame}
              >
                Join game
              </button>
              <div className="text-center mt-3">- or -</div>
              <button
                className="btn btn-primary fw-bold mt-3"
                onClick={handleCreateGame}
              >
                Create new game
              </button>
              <div className="d-flex justify-content-end mt-3">
                {stompClient?.connected ? "Connected" : "Not connected"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
