import { AnswerHistory, Question, User } from "../data/model.ts";
import { Container } from "./Container.tsx";
import { PlayerAvatar } from "./PlayerAvatar.tsx";
import cx from "classnames";
import { BASE_HOST_URL } from "../utils/config.ts";

type UserWithDrawing = User & {
  drawing: string | undefined;
};

export function ResultsDrawing({
  question,
  users,
  answers,
  onContinue,
  userNicknameToAskAbout,
  labels,
  timer,
  isTv,
}: {
  question: Question;
  users: User[];
  answers: AnswerHistory[];
  userNicknameToAskAbout: string;
  onContinue: () => void;
  labels: {
    continue: string;
  };
  timer: number;
  isTv: boolean;
}) {
  const usersWithDrawings: UserWithDrawing[] = users.map((user) => ({
    ...user,
    drawing: answers.find((a) => a.userId === user.id)?.drawing,
  }));

  return (
    <Container>
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userNicknameToAskAbout)}</h1>
      </div>
      <div className="d-flex flex-column align-items-center">
        {usersWithDrawings
          .filter((user) => user.drawing)
          .map((user, index) => {
            return (
              <div
                className="d-flex flex-column align-items-center mb-3"
                key={user.id}
              >
                <img
                  className={cx(
                    "shadow-lg mb-2 animate__animated animate__flip",
                    `animate_delay_${index}`,
                    {},
                  )}
                  src={`${BASE_HOST_URL}/uploads/${user.drawing}`}
                  alt="drawing"
                  style={{
                    maxWidth: "100%",
                    border: "15px solid #fff",
                  }}
                />
                <div>
                  <PlayerAvatar
                    avatarId={user.avatar}
                    size={48}
                    backgroundColor={user.color}
                  />
                  <div>{user.nickname}</div>
                </div>
              </div>
            );
          })}

        {!isTv && (
          <button
            onClick={onContinue}
            className="btn btn-warning text-black"
            disabled={timer > 0}
          >
            {labels.continue} {timer > 0 ? `(${timer}s)` : ""}
          </button>
        )}
      </div>
    </Container>
  );
}
