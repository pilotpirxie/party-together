import { Container } from "../components/Container.tsx";
import { useAppSelector } from "../data/store.ts";
import { PlayerAvatar } from "../components/PlayerAvatar.tsx";
import { Question, User } from "../data/model.ts";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const WaitingForOther = ({
  onContinue,
  question,
  userToAskAbout,
}: {
  onContinue: () => void;
  question: Question;
  userToAskAbout: User;
}) => {
  const { t } = useTranslation();
  const gameUsers = useAppSelector((state) => state.game.users);
  const anyUserNotReady = gameUsers.some((user) => !user.isReady);
  const [timer, setTimer] = useState(60);
  const timerTo = useAppSelector((state) => state.game.gameRoom.timerTo);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timerTo) return;
      const newTimer = dayjs(new Date(timerTo * 1000)).diff(
        dayjs.utc(),
        "second",
      );
      setTimer(newTimer);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <div className="text-center">
        <div>{timer > 0 ? timer + "s" : "0s"}</div>
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      </div>

      {anyUserNotReady && (
        <div className="text-center">
          <h4>{t("Waiting for other players...")}</h4>
        </div>
      )}

      <div className="justify-content-center d-flex flex-wrap align-items-center justify-content-center mt-3 mt-0">
        {gameUsers.map((user) => (
          <div key={user.id} className="d-flex mb-3 mx-1">
            <PlayerAvatar
              avatarId={user.avatar}
              size={64}
              backgroundColor={user.isReady ? "#00fe00" : "#dc3545"}
            />
            <div className="ms-2 d-flex justify-content-center flex-column">
              <b>{user.nickname}</b>
              {user.isReady && <div>{t("Ready!")}</div>}
            </div>
          </div>
        ))}
      </div>

      {(timer <= 0 || !anyUserNotReady) && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={() => onContinue()}>
            {anyUserNotReady ? t("Don't wait, continue!") : t("Continue")}
          </button>
        </div>
      )}
    </Container>
  );
};
