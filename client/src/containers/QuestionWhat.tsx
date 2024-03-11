import { Question, User } from "../data/model.ts";

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
    <div>
      <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      {question.answers.map((answer, index) => (
        <button key={answer.id} onClick={() => handleAnswer(index)}>
          {answer.content}
        </button>
      ))}
    </div>
  );
}
