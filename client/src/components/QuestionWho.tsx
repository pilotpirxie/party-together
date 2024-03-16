import { Question, User } from "../data/model.ts";
import { PlayerAvatar } from "./PlayerAvatar.tsx";
import { Container } from "./Container.tsx";

export function QuestionWho({
  question,
  onAnswer,
  userToAskAbout,
  users,
  timer,
  code,
}: {
  question: Question;
  userToAskAbout: User;
  onAnswer: (answerId: string) => void;
  users: User[];
  timer: number;
  code: string;
}) {
  return (
    <Container>
      <div className="text-center">
        <div className="d-flex justify-content-between">
          <div>{timer > 0 ? timer + "s" : "0s"}</div>
          <div>{code}</div>
        </div>
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
      <div className="text-center mt-2"></div>
    </Container>
  );
}
