import { Question, User } from "../data/model.ts";
import { useState } from "react";

export function QuestionWho({
  question,
  onAnswer,
  userToAskAbout,
  users,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answerId: string) => void;
  users: User[];
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    const userId = users[selectedAnswer].id;
    onAnswer(userId);
  };

  return (
    <div>
      <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      {users.map((user, index) => (
        <button key={user.id} onClick={() => setSelectedAnswer(index)}>
          {user.nickname} {index === selectedAnswer && "✔"}
        </button>
      ))}
      <br />
      <button onClick={handleAnswer}>Continue</button>
    </div>
  );
}
