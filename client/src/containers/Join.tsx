import { useSocket } from "../socket/useSocket.ts";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "../components/Container.tsx";
import { useTranslation } from "react-i18next";
import { getRandomPastelColor } from "../utils/colors.ts";
import { getRandomAvatar } from "../utils/avatars.ts";
import useLocalStorage from "../utils/useLocalStorage.ts";
import dayjs from "dayjs";
import { Footer } from "../components/Footer.tsx";
import { AvatarChoose } from "../components/Avatar.tsx";

export function Join() {
  const [nickname, setNickname] = useLocalStorage(
    "nickname",
    "Player" + Math.floor(Math.random() * 100),
  );
  const [avatar, setAvatar] = useLocalStorage("avatar", getRandomAvatar());
  const [color, setColor] = useLocalStorage("color", getRandomPastelColor());
  const [code, setCode] = useState("");

  const { connect } = useSocket();
  const location = useLocation();
  const { t } = useTranslation();

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
      type: "join",
      nickname,
      color,
      avatar,
      code: code.toLowerCase(),
    });
  };

  const handleRollAvatar = (avatarIndex: number, color: string) => {
    setAvatar(avatarIndex);
    setColor(color);
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
          🦄 Join a game
        </h1>
      </div>
      <AvatarChoose
        avatar={avatar}
        color={color}
        onRollAvatar={handleRollAvatar}
      />
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
      <Link to={"/new"}>
        <button
          type="button"
          className="btn btn-primary form-control fw-bold mt-3"
        >
          {t("Create new game")}
        </button>
      </Link>
      <Footer />
    </Container>
  );
}
