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
    <div className="bg-info vh-100">
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <div className="card card-body p-5">
              <div className="text-center">
                <h1>Category: {currentCategory?.name}</h1>
                <div className="fs-3 my-4">{currentCategory?.description}</div>
              </div>

              <button
                className="btn btn-warning text-black"
                onClick={handleContinue}
              >
                Show us the first question!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
