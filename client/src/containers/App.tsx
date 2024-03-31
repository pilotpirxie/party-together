import { useSocket } from "../socket/useSocket.ts";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { PlayerAvatar } from "../components/PlayerAvatar.tsx";
import { Container } from "../components/Container.tsx";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { getRandomPastelColor } from "../utils/colors.ts";
import { getRandomAvatar } from "../utils/avatars.ts";
import useLocalStorage from "../utils/useLocalStorage.ts";
import dayjs from "dayjs";

function App() {
  const [nickname, setNickname] = useLocalStorage(
    "nickname",
    "Player" + Math.floor(Math.random() * 100),
  );
  const [avatar, setAvatar] = useLocalStorage("avatar", getRandomAvatar());
  const [color, setColor] = useLocalStorage("color", getRandomPastelColor());
  const [code, setCode] = useState("");

  const { connect } = useSocket();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastGameCode = localStorage.getItem("code");
      const lastGameCodeDate = localStorage.getItem("codeDate");

      if (lastGameCode && lastGameCodeDate) {
        const lastGameCodeDateParsed = dayjs(lastGameCodeDate);
        const now = dayjs();
        const diff = now.diff(lastGameCodeDateParsed);

        if (diff < 1000 * 60 * 60) {
          setCode(lastGameCode);
        }
      }
    }
  }, []);

  const handleJoinGame = () => {
    if (!nickname || !code) {
      return;
    }

    connect({
      nickname,
      color,
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
      color,
      avatar,
      code: "",
    });
  };

  const handleRollAvatar = () => {
    setAvatar(getRandomAvatar());
    setColor(getRandomPastelColor());

    avatarRef.current?.classList.remove("animate__jello");
    setTimeout(() => {
      avatarRef.current?.classList.add("animate__jello");
    }, 10);
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
        <div ref={avatarRef} className="animate__jello animate__animated">
          <PlayerAvatar avatarId={avatar} backgroundColor={color} />
        </div>
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
      <div className="text-center mt-3">- {t("or")} -</div>
      <button
        className="btn btn-primary fw-bold mt-3"
        onClick={handleCreateGame}
      >
        {t("Create new game")}
      </button>
      <div className="text-center mt-3">
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
