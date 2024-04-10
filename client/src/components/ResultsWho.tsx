import { AnswerHistory, Question, User } from "../data/model.ts";
import { Container } from "./Container.tsx";
import { PlayerAvatar } from "./PlayerAvatar.tsx";
import cx from "classnames";

type UserChoice = User & {
  selectedBy: User[];
};

export function ResultsWho({
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
    thisPlayer: string;
    gotVotesFrom: string;
    continue: string;
  };
  timer: number;
  isTv: boolean;
}) {
  const userChoices: UserChoice[] = users.map((user) => {
    const selectedBy = answers
      .filter((answer) => answer.selectedUserId === user.id)
      .map((answer) => users.find((u) => u.id === answer.userId))
      .filter((user) => user !== undefined) as User[];
    return { ...user, selectedBy: [...selectedBy] };
  });

  const usersToRender = userChoices
    .filter((userChoice) => userChoice.selectedBy.length > 0)
    .sort((a, b) => b.selectedBy.length - a.selectedBy.length);

  return (
    <Container>
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userNicknameToAskAbout)}</h1>
      </div>
      <div className="d-flex flex-row gap-3 justify-content-center flex-wrap cursor-pointer"></div>
      <div className="text-center">
        {usersToRender.map((userChoice, index) => (
          <div key={userChoice.id}>
            <div>
              <PlayerAvatar
                avatarId={userChoice.avatar}
                backgroundColor={userChoice.color}
                size={96}
                className={cx(
                  "animate__animated animate__bounceInLeft",
                  `animate_delay_${index}`,
                )}
              />
              <div>
                {labels.thisPlayer} {userChoice.nickname} {labels.gotVotesFrom}:
              </div>
            </div>
            <div className="d-flex gap-3 justify-content-center mt-3">
              {userChoice.selectedBy.map((selectedBy) => (
                <div key={selectedBy.id}>
                  <PlayerAvatar
                    avatarId={selectedBy.avatar}
                    size={48}
                    backgroundColor={selectedBy.color}
                  />
                  <div key={selectedBy.id}>{selectedBy.nickname}</div>
                </div>
              ))}
            </div>
            {index < usersToRender.length - 1 && (
              <div className="px-5">
                <hr className="border-dark-subtle" />
              </div>
            )}
          </div>
        ))}

        {!isTv && (
          <button
            onClick={onContinue}
            className="btn btn-warning text-black mt-3"
            disabled={timer > 0}
          >
            {labels.continue} {timer > 0 ? `(${timer}s)` : ""}
          </button>
        )}
      </div>
    </Container>
  );
}
