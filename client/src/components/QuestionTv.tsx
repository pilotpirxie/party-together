import { Container } from "./Container.tsx";
import { PlayerAvatar } from "./PlayerAvatar.tsx";
import { Question, User } from "../data/model.ts";
import { useTranslation } from "react-i18next";

export const QuestionTv = ({
  question,
  userNicknameToAskAbout,
  timer,
  users,
  totalQuestions,
  questionIndex,
  code,
}: {
  question: Question;
  userNicknameToAskAbout: string;
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
        <div className="d-flex justify-content-between">
          <div>{timer > 0 ? timer + "s" : "0s"}</div>
          <div>
            {questionIndex + 1}/{totalQuestions}
          </div>
          <div>{code}</div>
        </div>
        <h1 className="text-large">
          {question.content.replace("NICKNAME", userNicknameToAskAbout)}
        </h1>
      </div>

      {anyUserNotReady && (
        <div className="text-center">
          <h4>{t("Waiting for players...")}</h4>
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
    </Container>
  );
};
