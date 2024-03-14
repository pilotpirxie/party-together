import { Question, User } from "../data/model.ts";
import { PlayerAvatar } from "../components/PlayerAvatar.tsx";
import { Container } from "../components/Container.tsx";

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
    <Container>
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      </div>
      <div className="d-flex flex-row gap-3 justify-content-center flex-wrap cursor-pointer">
        {users.map((user, index) => (
          <div
            className="border-1 rounded-1 text-black text-center"
            key={user.id}
            onClick={() => handleAnswer(index)}
          >
            <PlayerAvatar avatarId={user.avatar} size={110} />
            <div>{user.nickname}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}
