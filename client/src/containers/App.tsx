import { useSocket } from "../socket/useSocket.ts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PlayerAvatar } from "../components/PlayerAvatar.tsx";
import { Container } from "../components/Container.tsx";
import { useTranslation } from "react-i18next";
import cx from "classnames";

function App() {
  const [nickname, setNickname] = useState(
    "Player" + Math.floor(Math.random() * 100),
  );
  const [avatar, setAvatar] = useState(Math.floor(Math.random() * 83));
  const [code, setCode] = useState("");

  const { connect } = useSocket();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleJoinGame = () => {
    if (!nickname || !code) {
      return;
    }

    connect({
      nickname,
      avatar,
      code: code.toLowerCase(),
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
    <Container size="s">
      <div className="text-center">
        <h1 className="animate__pulse animate__animated animate__infinite">
          🦄 Party Together
        </h1>
      </div>
      <div className="text-center cursor-pointer" onClick={handleRollAvatar}>
        <PlayerAvatar
          avatarId={avatar}
          className="animate__jello animate__animated"
        />
        <div>
          <i className="ri-refresh-line" /> {t("Roll avatar")}
        </div>
      </div>
      <label>{t("Nickname")}</label>
      <input
        className="form-control"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <label className="mt-3">{t("Game code")}</label>
      <input
        className="form-control"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="btn btn-warning text-black fw-bold mt-3"
        onClick={handleJoinGame}
      >
        {t("Join game")}
      </button>
      <div className="text-center mt-3">- or -</div>
      <button
        className="btn btn-primary fw-bold mt-3"
        onClick={handleCreateGame}
      >
        {t("Create new game")}
      </button>
      <div className="text-center mt-3">
        {/*{stompClient?.connected ? "Connected" : "Not connected"}*/}
        {t("Game created by")}
        <a
          href="https://github.com/pilotpirxie/party-together"
          target="_blank"
          rel="noreferrer"
          className="mx-1"
        >
          PilotPirxie
        </a>
        {t("and")}
        <a
          href="https://behance.net/krzysztofsojka1"
          target="_blank"
          rel="noreferrer"
          className="mx-1"
        >
          XantesS
        </a>
        {" © " + new Date().getFullYear()}
      </div>
      <div className="d-flex gap-3 justify-content-center">
        <div
          className={cx("cursor-pointer", {
            "text-decoration-underline": i18n.language === "en",
          })}
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </div>
        <div
          className={cx("cursor-pointer", {
            "text-decoration-underline": i18n.language === "pl",
          })}
          onClick={() => i18n.changeLanguage("pl")}
        >
          PL
        </div>
      </div>
    </Container>
  );
}

export default App;
