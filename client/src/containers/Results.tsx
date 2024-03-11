import { useSocket } from "../socket/useSocket.ts";
import { useAppSelector } from "../data/store.ts";

export function Results() {
  const { sendMessage } = useSocket();
  const gameState = useAppSelector((state) => state.game);
  const currentQuestion = gameState.questions[gameState.game.questionIndex];

  const handleContinue = () => {
    sendMessage({
      type: "ContinueToQuestion",
      payload: {
        nextQuestionIndex: gameState.game.questionIndex + 1,
      },
    });
  };

  const findUser = (userId: string) => {
    return gameState.users.find((user) => user.id === userId);
  };

  return (
    <div>
      <h1>Results</h1>

      {gameState.answers
        .filter((answer) => answer.questionId === currentQuestion.id)
        .map((answer) => (
          <div>
            <h2>{findUser(answer.userId)?.nickname}</h2>
            <p>{answer.answerId || answer.selectedUserId || answer.drawing}</p>
          </div>
        ))}

      <button onClick={handleContinue}>Continue</button>
    </div>
  );
}
