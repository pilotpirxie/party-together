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
import { BASE_HOST_URL } from "../utils/config.ts";

dayjs.extend(utc);

export function Question() {
  const { sendMessage } = useSocket();
  const { t } = useTranslation();
  const [timer, setTimer] = useState(60);

  const currentQuestion = useAppSelector(
    (state) => state.game.questions[state.game.gameRoom.questionIndex],
  );
  const userNicknameToAskAbout = useAppSelector((state) => {
    const currentNicknameIndex =
      state.game.gameRoom.questionIndex %
      state.game.gameRoom.nicknamesForQuestions.length;
    return state.game.gameRoom.nicknamesForQuestions[currentNicknameIndex];
  });

  const users = useAppSelector((state) => state.game.users);
  const currentUser = useAppSelector((state) => state.game.currentUser);
  const timerTo = useAppSelector((state) => state.game.gameRoom.timerTo);
  const code = useAppSelector((state) => state.game.gameRoom.code);
  const questionIndex = useAppSelector(
    (state) => state.game.gameRoom.questionIndex,
  );
  const totalQuestions = useAppSelector((state) => state.game.questions.length);

  const handleAnswer = (answer: string) => {
    sendMessage({
      type: "SendAnswer",
      payload: {
        questionId: currentQuestion.id,
        answer,
      },
    });
  };

  const handleDrawingAnswer = (drawing: Blob) => {
    const formData = new FormData();
    formData.append("file", drawing, "image.jpeg");
    formData.append("sessionId", currentUser.sessionId);
    formData.append("questionId", currentQuestion.id.toString());

    fetch(BASE_HOST_URL + "/upload", {
      method: "POST",
      body: formData,
    }).catch((error) => {
      console.error("Error:", error);
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
          userNicknameToAskAbout={userNicknameToAskAbout || ""}
          onContinue={handleContinue}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          code={code}
          users={users}
          timer={timer}
        />
      )}

      {!currentUser.isReady && (
        <>
          {currentQuestion.type === "WHAT" && (
            <QuestionWhat
              question={currentQuestion}
              onAnswer={handleAnswer}
              userNicknameToAskAbout={userNicknameToAskAbout || ""}
              timer={timer}
              code={code}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
            />
          )}

          {currentQuestion.type === "WHO" && (
            <QuestionWho
              question={currentQuestion}
              onAnswer={handleAnswer}
              userNicknameToAskAbout={userNicknameToAskAbout || ""}
              users={users}
              timer={timer}
              code={code}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
            />
          )}

          {currentQuestion.type === "DRAWING" && (
            <QuestionDrawing
              question={currentQuestion}
              onAnswer={handleDrawingAnswer}
              userNicknameToAskAbout={userNicknameToAskAbout || ""}
              labels={{
                done: t("Done"),
              }}
              timer={timer}
              code={code}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
            />
          )}
        </>
      )}
    </>
  );
}
