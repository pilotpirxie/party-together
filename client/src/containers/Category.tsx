import { useAppSelector } from "../data/store.ts";
import { useSocket } from "../socket/useSocket.ts";
import { Container } from "../components/Container.tsx";

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
    <Container>
      <div className="text-center">
        <h1>Category: {currentCategory?.name}</h1>
        <div className="fs-3 my-4">{currentCategory?.description}</div>
      </div>

      <button className="btn btn-warning text-black" onClick={handleContinue}>
        Show the first question!
      </button>
    </Container>
  );
}
