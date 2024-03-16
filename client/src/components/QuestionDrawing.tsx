import { Question, User } from "../data/model.ts";
import { Canvas } from "./Canvas.tsx";
import { Container } from "./Container.tsx";

export function QuestionDrawing({
  question,
  onAnswer,
  userToAskAbout,
  labels,
  timer,
  code,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answer: string) => void;
  timer: number;
  labels: {
    done: string;
  };
  code: string;
}) {
  return (
    <Container>
      <div className="text-center">
        <div className="d-flex justify-content-between">
          <div>{timer > 0 ? timer + "s" : "0s"}</div>
          <div>{code}</div>
        </div>{" "}
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
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
