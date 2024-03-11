import { Question, User } from "../data/model.ts";

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
  const handleAnswer = (index: number) => {
    if (index === null) return;
    const userId = users[index].id;
    onAnswer(userId);
  };

  return (
    <div>
      <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      {users.map((user, index) => (
        <button key={user.id} onClick={() => handleAnswer(index)}>
          {user.nickname}
        </button>
      ))}
    </div>
  );
}
