import { Question, User } from "../data/model.ts";
import { Container } from "./Container.tsx";

export function QuestionWhat({
  question,
  onAnswer,
  userToAskAbout,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answerId: string) => void;
}) {
  return (
    <Container size="s">
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      </div>
      <div className="d-flex flex-column">
        {question.answers.map((answer) => (
          <button
            className="btn btn-warning btn-lg text-black my-2"
            key={answer.id}
            onClick={() => onAnswer(answer.id)}
          >
            {answer.content}
          </button>
        ))}
      </div>
    </Container>
  );
}
