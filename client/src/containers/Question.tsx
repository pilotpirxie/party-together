import { useAppSelector } from "../data/store.ts";
import { QuestionWhat } from "./QuestionWhat.tsx";
import { QuestionWho } from "./QuestionWho.tsx";
import { useSocket } from "../socket/useSocket.ts";
import { QuestionDrawing } from "./QuestionDrawing.tsx";
import { WaitingForOther } from "./WaitingForOther.tsx";

export function Question() {
  const { sendMessage } = useSocket();
  const gameState = useAppSelector((state) => state.game);

  const currentQuestion = gameState.questions[gameState.game.questionIndex];
  const firstUser = gameState.users[0];
  const userToAskAbout = gameState.users.at(
    (gameState.users.length % (gameState.game.questionIndex + 1)) - 1,
  );

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
    <div>
      {gameState.currentUser.isReady && (
        <WaitingForOther
          question={currentQuestion}
          userToAskAbout={userToAskAbout || firstUser}
          onContinue={handleContinue}
        />
      )}

      {!gameState.currentUser.isReady && (
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
              users={gameState.users}
            />
          )}

          {currentQuestion.type === "DRAWING" && (
            <QuestionDrawing
              question={currentQuestion}
              onAnswer={handleAnswerWhat}
              userToAskAbout={userToAskAbout || firstUser}
            />
          )}
        </>
      )}
    </div>
  );
}
