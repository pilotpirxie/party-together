import { useAppSelector } from "../data/store.ts";
import { QuestionWhat } from "./QuestionWhat.tsx";
import { QuestionWho } from "./QuestionWho.tsx";

export function Question() {
  const gameState = useAppSelector((state) => state.game);

  const currentQuestion = gameState.questions[gameState.game.questionIndex];
  const firstUser = gameState.users[0];
  const currentUserToAskAbout = gameState.users.at(
    (gameState.users.length % (gameState.game.questionIndex + 1)) - 1,
  );

  const handleAnswerWhat = (answerId: string) => {
    console.log("Answered", answerId);
  };

  return (
    <div>
      {currentQuestion.type === "WHAT" && (
        <QuestionWhat
          question={currentQuestion}
          onAnswer={handleAnswerWhat}
          userToAskAbout={currentUserToAskAbout || firstUser}
        />
      )}

      {currentQuestion.type === "WHO" && (
        <QuestionWho
          question={currentQuestion}
          onAnswer={handleAnswerWhat}
          userToAskAbout={currentUserToAskAbout || firstUser}
          users={gameState.users}
        />
      )}
    </div>
  );
}
