import { useAppSelector } from "../data/store.ts";
import { QuestionWhat } from "../components/QuestionWhat.tsx";
import { QuestionWho } from "../components/QuestionWho.tsx";
import { useSocket } from "../socket/useSocket.ts";
import { QuestionDrawing } from "../components/QuestionDrawing.tsx";
import { WaitingForOther } from "./WaitingForOther.tsx";
import { useTranslation } from "react-i18next";

export function Question() {
  const { sendMessage } = useSocket();
  const { t } = useTranslation();

  const currentQuestion = useAppSelector(
    (state) => state.game.questions[state.game.gameRoom.questionIndex],
  );
  const firstUser = useAppSelector((state) => state.game.users[0]);
  const userToAskAbout = useAppSelector((state) =>
    state.game.users.at(
      (state.game.users.length % (state.game.gameRoom.questionIndex + 1)) - 1,
    ),
  );
  const users = useAppSelector((state) => state.game.users);
  const currentUser = useAppSelector((state) => state.game.currentUser);

  const handleAnswerWhat = (answer: string) => {
    sendMessage({
      type: "SendAnswer",
      payload: {
        questionId: currentQuestion.id,
        answer,
      },
    });
  };

  const handleContinue = () => {
    sendMessage({
      type: "ContinueToResults",
    });
  };

  return (
    <>
      {currentUser.isReady && (
        <WaitingForOther
          question={currentQuestion}
          userToAskAbout={userToAskAbout || firstUser}
          onContinue={handleContinue}
        />
      )}

      {!currentUser.isReady && (
        <>
          {currentQuestion.type === "WHAT" && (
            <QuestionWhat
              question={currentQuestion}
              onAnswer={handleAnswerWhat}
              userToAskAbout={userToAskAbout || firstUser}
            />
          )}

          {currentQuestion.type === "WHO" && (
            <QuestionWho
              question={currentQuestion}
              onAnswer={handleAnswerWhat}
              userToAskAbout={userToAskAbout || firstUser}
              users={users}
            />
          )}

          {currentQuestion.type === "DRAWING" && (
            <QuestionDrawing
              question={currentQuestion}
              onAnswer={handleAnswerWhat}
              userToAskAbout={userToAskAbout || firstUser}
              labels={{
                done: t("Done"),
              }}
            />
          )}
        </>
      )}
    </>
  );
}
