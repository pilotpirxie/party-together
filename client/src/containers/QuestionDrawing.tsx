import { Question, User } from "../data/model.ts";
import { Canvas } from "../components/Canvas.tsx";
import { Container } from "../components/Container.tsx";

export function QuestionDrawing({
  question,
  onAnswer,
  userToAskAbout,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answer: string) => void;
}) {
  return (
    <Container>
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
        <Canvas onSubmit={onAnswer} />
      </div>
    </Container>
  );
}
