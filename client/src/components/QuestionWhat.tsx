import { Question, User } from "../data/model.ts";
import { Container } from "./Container.tsx";

export function QuestionWhat({
  question,
  onAnswer,
  userToAskAbout,
  timer,
  code,
  totalQuestions,
  questionIndex,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answerId: string) => void;
  timer: number;
  code: string;
  questionIndex: number;
  totalQuestions: number;
}) {
  return (
    <Container size="s">
      <div className="text-center">
        <div className="d-flex justify-content-between">
          <div>{timer > 0 ? timer + "s" : "0s"}</div>
          <div>
            {questionIndex + 1}/{totalQuestions}
          </div>
          <div>{code}</div>
        </div>
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
