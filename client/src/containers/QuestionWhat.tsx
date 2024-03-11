import { Question, User } from "../data/model.ts";
import { useState } from "react";

export function QuestionWhat({
  question,
  onAnswer,
  userToAskAbout,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answerId: string) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    const answerId = question.answers[selectedAnswer].id;
    onAnswer(answerId);
  };

  return (
    <div>
      <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      {question.answers.map((answer, index) => (
        <button key={answer.id} onClick={() => setSelectedAnswer(index)}>
          {answer.content} {index === selectedAnswer && "✔"}
        </button>
      ))}
      <br />
      <button onClick={handleAnswer}>Continue</button>
    </div>
  );
}
