import { useAppSelector } from "../data/store.ts";
import { QuestionWhat } from "../components/QuestionWhat.tsx";
import { QuestionWho } from "../components/QuestionWho.tsx";
import { useSocket } from "../socket/useSocket.ts";
import { QuestionDrawing } from "../components/QuestionDrawing.tsx";
import { WaitingForOther } from "./WaitingForOther.tsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function Question() {
  const { sendMessage } = useSocket();
  const { t } = useTranslation();
  const [timer, setTimer] = useState(60);

  const currentQuestion = useAppSelector(
    (state) => state.game.questions[state.game.gameRoom.questionIndex],
  );
  const firstUser = useAppSelector((state) => state.game.users[0]);
  const userToAskAbout = useAppSelector((state) =>
    state.game.users.at(
      state.game.gameRoom.questionIndex % state.game.users.length,
    ),
  );
  const users = useAppSelector((state) => state.game.users);
  const currentUser = useAppSelector((state) => state.game.currentUser);
  const timerTo = useAppSelector((state) => state.game.gameRoom.timerTo);
  const code = useAppSelector((state) => state.game.gameRoom.code);

  const handleAnswer = (answer: string) => {
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
              onAnswer={handleAnswer}
              userToAskAbout={userToAskAbout || firstUser}
              timer={timer}
              code={code}
            />
          )}

          {currentQuestion.type === "WHO" && (
            <QuestionWho
              question={currentQuestion}
              onAnswer={handleAnswer}
              userToAskAbout={userToAskAbout || firstUser}
              users={users}
              timer={timer}
              code={code}
            />
          )}

          {currentQuestion.type === "DRAWING" && (
            <QuestionDrawing
              question={currentQuestion}
              onAnswer={handleAnswer}
              userToAskAbout={userToAskAbout || firstUser}
              labels={{
                done: t("Done"),
              }}
              timer={timer}
              code={code}
            />
          )}
        </>
      )}
    </>
  );
}
