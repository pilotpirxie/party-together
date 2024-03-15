import { Question, User } from "../data/model.ts";
import { Canvas } from "./Canvas.tsx";
import { Container } from "./Container.tsx";

export function QuestionDrawing({
  question,
  onAnswer,
  userToAskAbout,
  labels,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answer: string) => void;
  labels: {
    done: string;
  };
}) {
  return (
    <Container>
      <div className="text-center">
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
