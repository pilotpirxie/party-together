import { Question, User } from "../data/model.ts";
import { PlayerAvatar } from "./PlayerAvatar.tsx";
import { Container } from "./Container.tsx";

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
  return (
    <Container>
      <div className="text-center">
        <h1>{question.content.replace("NICKNAME", userToAskAbout.nickname)}</h1>
      </div>
      <div className="d-flex flex-row gap-3 justify-content-center flex-wrap cursor-pointer">
        {users.map((user) => (
          <div
            className="border-1 rounded-1 text-black text-center"
            key={user.id}
            onClick={() => onAnswer(user.id)}
          >
            <PlayerAvatar avatarId={user.avatar} size={110} />
            <div>{user.nickname}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}
