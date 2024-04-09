import { Question } from "../data/model.ts";
import { Canvas } from "./Canvas.tsx";
import { Container } from "./Container.tsx";

export function QuestionDrawing({
  question,
  onAnswer,
  userNicknameToAskAbout,
  labels,
  timer,
  code,
  totalQuestions,
  questionIndex,
}: {
  question: Question;
  userNicknameToAskAbout: string;
  onAnswer: (answer: Blob) => void;
  timer: number;
  labels: {
    done: string;
  };
  code: string;
  questionIndex: number;
  totalQuestions: number;
}) {
  return (
    <Container>
      <div className="text-center">
        <div className="d-flex justify-content-between">
          <div>{timer > 0 ? timer + "s" : "0s"}</div>
          <div>
            {questionIndex + 1}/{totalQuestions}
          </div>
          <div>{code}</div>
        </div>
        <h1>{question.content.replace("NICKNAME", userNicknameToAskAbout)}</h1>
        <Canvas
          onSubmit={onAnswer}
          labels={{
            done: labels.done,
          }}
        />
      </div>
    </Container>
  );
}
