import { useAppSelector } from "../data/store.ts";
import { useSocket } from "../socket/useSocket.ts";

export function Category() {
  const { sendMessage } = useSocket();
  const gameState = useAppSelector((state) => state.game);
  const currentQuestion = gameState.questions[gameState.game.questionIndex];
  const currentCategoryId = currentQuestion.categoryId;
  const currentCategory = gameState.categories.find(
    (category) => category.id === currentCategoryId,
  );

  const handleContinue = () => {
    sendMessage({
      type: "ContinueToQuestion",
      payload: { nextQuestionIndex: gameState.game.questionIndex },
    });
  };

  return (
    <div>
      <h3>Welcome in new category!</h3>
      <h1>{currentCategory?.name}</h1>
      <h2>{currentCategory?.description}</h2>

      <button onClick={handleContinue}>Continue</button>
    </div>
  );
}
