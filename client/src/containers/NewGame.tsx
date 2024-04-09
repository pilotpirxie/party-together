import { useSocket } from "../socket/useSocket.ts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container.tsx";
import { getRandomPastelColor } from "../utils/colors.ts";
import { getRandomAvatar } from "../utils/avatars.ts";
import useLocalStorage from "../utils/useLocalStorage.ts";
import { Footer } from "../components/Footer.tsx";
import { useTranslation } from "react-i18next";
import { AvatarChoose } from "../components/Avatar.tsx";

export function NewGame() {
  const [nickname, setNickname] = useLocalStorage(
    "nickname",
    "Player" + Math.floor(Math.random() * 100),
  );
  const [avatar, setAvatar] = useLocalStorage("avatar", getRandomAvatar());
  const [color, setColor] = useLocalStorage("color", getRandomPastelColor());
  const [mode, setMode] = useState(0);
  const [timeToAnswer, setTimeToAnswer] = useState(30);
  const [timeToDraw, setTimeToDraw] = useState(120);

  const { t } = useTranslation();
  const { connect } = useSocket();

  const handleCreateGame = () => {
    if (!nickname) {
      return;
    }

    connect({
      type: "create",
      nickname,
      color,
      avatar,
      code: "",
      mode,
      timeToAnswer,
      timeToDraw,
    });
  };

  const handleRollAvatar = (avatarIndex: number, color: string) => {
    setAvatar(avatarIndex);
    setColor(color);
  };

  return (
    <Container size="s">
      <div className="text-center">
        <h1 className="animate__pulse animate__animated animate__infinite">
          🎭 Create new game
        </h1>
      </div>
      <AvatarChoose
        avatar={avatar}
        color={color}
        onRollAvatar={handleRollAvatar}
      />

      <div>
        <label>{t("Nickname")}</label>
        <input
          className="form-control"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div>
        <label className="mt-3">{t("Game mode")}</label>
        <select
          className="form-control"
          value={mode}
          onChange={(e) => setMode(Number(e.target.value))}
        >
          <option value="0">{t("Play with Friends")}</option>
          <option value="1">{t("Play with Coworkers")}</option>
        </select>
      </div>

      <div>
        <label className="mt-3">{t("Time to answer")}</label>
        <input
          min={10}
          max={300}
          type="number"
          className="form-control"
          value={timeToAnswer}
          onChange={(e) => setTimeToAnswer(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="mt-3">{t("Time to draw")}</label>
        <input
          min={10}
          max={300}
          type="number"
          className="form-control"
          value={timeToDraw}
          onChange={(e) => setTimeToDraw(Number(e.target.value))}
        />
      </div>

      <button
        className="btn btn-warning text-black fw-bold mt-3"
        onClick={handleCreateGame}
      >
        {t("Create new game")}
      </button>
      <div className="text-center mt-3">- {t("or")} -</div>
      <Link to="/">
        <button className="btn btn-primary form-control fw-bold mt-3">
          {t("Join game")}
        </button>
      </Link>
      <Footer />
    </Container>
  );
}
