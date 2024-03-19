import { Container } from "../components/Container.tsx";
import { PlayerAvatar } from "../components/PlayerAvatar.tsx";
import { Question, User } from "../data/model.ts";
import { useTranslation } from "react-i18next";

export const WaitingForOther = ({
  onContinue,
  question,
  userToAskAbout,
  timer,
  users,
}: {
  onContinue: () => void;
  question: Question;
  userToAskAbout: User;
  code: string;
  questionIndex: number;
  totalQuestions: number;
  timer: number;
  users: User[];
}) => {
  const { t } = useTranslation();
  const anyUserNotReady = users.some((user) => !user.isReady);

  return (
    <Container>
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      </div>

      {anyUserNotReady && (
        <div className="text-center">
          <h4>{t("Waiting for other players...")}</h4>
        </div>
      )}

      <div className="justify-content-center d-flex flex-wrap align-items-center justify-content-center mt-3 mt-0">
        {users.map((user) => (
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

      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={() => onContinue()}
          disabled={anyUserNotReady && timer > 0}
        >
          {t("Continue")} {anyUserNotReady && timer > 0 ? `(${timer}s)` : ""}
        </button>
      </div>
    </Container>
  );
};
