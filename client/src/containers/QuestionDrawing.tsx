import { Question, User } from "../data/model.ts";

export function QuestionDrawing({
  question,
  onAnswer,
  userToAskAbout,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answerId: string) => void;
}) {
  // const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = () => {
    onAnswer("drawing answer");
  };

  return (
    <div>
      <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      <br />
      <button onClick={handleAnswer}>Send answer</button>
    </div>
  );
}
