import { Question, User } from "../data/model.ts";
import { Container } from "../components/Container.tsx";

export function QuestionWhat({
  question,
  onAnswer,
  userToAskAbout,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answerId: string) => void;
}) {
  const handleAnswer = (index: number) => {
    if (index === null) return;
    const answerId = question.answers[index].id;
    onAnswer(answerId);
  };

  return (
    <Container>
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      </div>
      <div className="d-flex flex-column">
        {question.answers.map((answer, index) => (
          <button
            className="btn btn-warning btn-lg text-black my-2"
            key={answer.id}
            onClick={() => handleAnswer(index)}
          >
            {answer.content}
          </button>
        ))}
      </div>
    </Container>
  );
}
