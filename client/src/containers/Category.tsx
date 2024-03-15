import { useAppSelector } from "../data/store.ts";
import { useSocket } from "../socket/useSocket.ts";
import { Container } from "../components/Container.tsx";
import { useTranslation } from "react-i18next";
import cx from "classnames";

export function Category() {
  const { sendMessage } = useSocket();
  const currentQuestion = useAppSelector(
    (state) => state.game.questions[state.game.gameRoom.questionIndex],
  );
  const currentCategoryId = currentQuestion.categoryId;
  const currentCategory = useAppSelector((state) =>
    state.game.categories.find((category) => category.id === currentCategoryId),
  );
  const questionIndex = useAppSelector(
    (state) => state.game.gameRoom.questionIndex,
  );
  const { t } = useTranslation();

  const handleContinue = () => {
    sendMessage({
      type: "ContinueToQuestion",
      payload: { nextQuestionIndex: questionIndex },
    });
  };

  const animateIn = [
    "animate__bounceInRight",
    "animate__bounceInUp",
    "animate__bounceInDown",
    "animate__fadeIn",
    "animate__fadeInDown",
    "animate__fadeInUp",
    "animate__zoomIn",
    "animate__slideInDown",
    "animate__backInRight",
  ];

  const randomAnimateIn =
    animateIn[Math.floor(Math.random() * animateIn.length)];

  return (
    <Container size="s">
      <div className="text-center">
        <h1
          className={cx("animate__animated animate__faster", randomAnimateIn)}
        >
          {currentCategory?.name}
        </h1>
        <div className="fs-3 my-4">{currentCategory?.description}</div>
      </div>

      <button className="btn btn-warning text-black" onClick={handleContinue}>
        {t("Show the first question!")}
      </button>
    </Container>
  );
}
