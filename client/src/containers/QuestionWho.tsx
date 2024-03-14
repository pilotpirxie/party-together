import { Question, User } from "../data/model.ts";
import { PlayerAvatar } from "../components/PlayerAvatar.tsx";

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
    <div className="bg-info vh-100">
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <div className="card card-body">
              <div className="text-center">
                <h1>
                  {question.content.replace(
                    "NICKNAME",
                    userToAskAbout.nickname,
                  )}
                </h1>
                <div className="d-flex flex-row gap-3 justify-content-center flex-wrap cursor-pointer">
                  {users.map((user, index) => (
                    <div
                      className="border-1 rounded-1 text-black"
                      key={user.id}
                      onClick={() => handleAnswer(index)}
                    >
                      <PlayerAvatar avatarId={user.avatar} size={110} />
                      <div>{user.nickname}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
