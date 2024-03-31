import { AnswerHistory, Question, User } from "../data/model.ts";
import { Container } from "./Container.tsx";
import { PlayerAvatar } from "./PlayerAvatar.tsx";
import { Bubble } from "./Bubble/Bubble.tsx";
import cx from "classnames";

type UserWithAnswer = User & {
  answer: string | undefined;
};

export function ResultsWhat({
  question,
  users,
  answers,
  onContinue,
  userToAskAbout,
  labels,
  timer,
}: {
  question: Question;
  users: User[];
  answers: AnswerHistory[];
  userToAskAbout: User;
  onContinue: () => void;
  labels: {
    continue: string;
  };
  timer: number;
}) {
  const usersWithChoices: UserWithAnswer[] = users.map((user) => {
    const answer = answers.find((answer) => answer.userId === user.id);
    return {
      ...user,
      answer: question.answers.find((a) => a.id === answer?.answerId)?.content,
    };
  });

  return (
    <Container>
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      </div>
      <div className="d-flex flex-column align-items-center">
        {usersWithChoices
          .filter((user) => user.answer)
          .map((user, index) => {
            const direction = index % 2 === 0 ? "left" : "right";
            return (
              <div className="d-flex align-items-center mb-3" key={user.id}>
                {direction === "left" && (
                  <div>
                    <PlayerAvatar
                      avatarId={user.avatar}
                      size={48}
                      backgroundColor={user.color}
                    />
                    <div>{user.nickname}</div>
                  </div>
                )}
                <Bubble
                  direction={direction}
                  className={cx("animate__animated", `animate_delay_${index}`, {
                    animate__rotateInDownLeft: direction === "left",
                    animate__rotateInDownRight: direction === "right",
                  })}
                >
                  <div className={"fs-4"}>{user.answer}</div>
                </Bubble>
                {direction === "right" && (
                  <div>
                    <PlayerAvatar
                      avatarId={user.avatar}
                      size={48}
                      backgroundColor={user.color}
                    />
                    <div>{user.nickname}</div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="text-center">
        <button
          onClick={onContinue}
          className="btn btn-warning text-black"
          disabled={timer > 0}
        >
          {labels.continue} {timer > 0 ? `(${timer}s)` : ""}
        </button>
      </div>
    </Container>
  );
}
