import { useSocket } from "../socket/useSocket.ts";
import { useAppSelector } from "../data/store.ts";
import { ResultsWho } from "../components/ResultsWho.tsx";
import { useTranslation } from "react-i18next";
import { ResultsWhat } from "../components/ResultsWhat.tsx";
import { ResultsDrawing } from "../components/ResultsDrawing.tsx";

export function Results() {
  const { sendMessage } = useSocket();
  const { t } = useTranslation();

  const currentQuestion = useAppSelector(
    (state) => state.game.questions[state.game.game.questionIndex],
  );
  const firstUser = useAppSelector((state) => state.game.users[0]);
  const userToAskAbout = useAppSelector((state) =>
    state.game.users.at(
      (state.game.users.length % (state.game.game.questionIndex + 1)) - 1,
    ),
  );
  const questionIndex = useAppSelector(
    (state) => state.game.game.questionIndex,
  );
  const users = useAppSelector((state) => state.game.users);
  const answers = useAppSelector((state) =>
    state.game.answers.filter(
      (answer) => answer.questionId === currentQuestion.id,
    ),
  );

  const handleContinue = () => {
    sendMessage({
      type: "ContinueToQuestion",
      payload: {
        nextQuestionIndex: questionIndex + 1,
      },
    });
  };

  return (
    <>
      {currentQuestion.type === "WHO" && (
        <ResultsWho
          question={currentQuestion}
          onContinue={handleContinue}
          userToAskAbout={userToAskAbout || firstUser}
          users={users}
          answers={answers}
          labels={{
            thisPlayer: t("This player"),
            gotVotesFrom: t("got votes from"),
            continue: t("Continue"),
          }}
        />
      )}

      {currentQuestion.type === "WHAT" && (
        <ResultsWhat
          question={currentQuestion}
          onContinue={handleContinue}
          userToAskAbout={userToAskAbout || firstUser}
          users={users}
          answers={answers}
          labels={{
            continue: t("Continue"),
          }}
        />
      )}

      {currentQuestion.type === "DRAWING" && (
        <ResultsDrawing
          question={currentQuestion}
          onContinue={handleContinue}
          userToAskAbout={userToAskAbout || firstUser}
          users={users}
          answers={answers}
          labels={{
            continue: t("Continue"),
          }}
        />
      )}
    </>
  );
}
