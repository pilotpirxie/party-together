import { useAppSelector } from "../data/store.ts";
import { useSocket } from "../socket/useSocket.ts";
import cx from "classnames";
import { PlayerAvatar } from "../components/PlayerAvatar.tsx";
import QRCode from "react-qr-code";
import { Container } from "../components/Container.tsx";

export function WaitingLobby() {
  const code = useAppSelector((state) => state.game.game.code);
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
    <Container>
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-3">
            <h1>Waiting for players...</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="text-center">
            <div className="fs-4">Scan to join the game</div>
            <QRCode value={window.location.href} size={200} className="my-3" />
            <div className="fs-4">
              Code: <span className="code-spacing">{code.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div>
            <div className="justify-content-center d-flex flex-wrap align-items-center justify-content-center mt-3 mt-0">
              {gameUsers.map((user) => (
                <div key={user.id} className="d-flex mb-3 mx-1">
                  <PlayerAvatar
                    avatarId={user.avatar}
                    size={48}
                    backgroundColor={user.isReady ? "#00fe00" : "#dc3545"}
                  />
                  <div className="ms-2 d-flex justify-content-center flex-column">
                    <b>{user.nickname}</b>
                    {user.isReady && <div>Ready!</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                onClick={handleToggleReady}
                className={cx("btn", {
                  "btn-success": currentUser.isReady,
                  "text-black": currentUser.isReady,
                  "btn-danger": !currentUser.isReady,
                })}
              >
                {currentUser.isReady ? "You are ready!" : "Mark as ready"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="text-center">
            <div className="mb-1">Everyone is ready?</div>
            <button className="btn btn-primary" onClick={handleStart}>
              Start game
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
