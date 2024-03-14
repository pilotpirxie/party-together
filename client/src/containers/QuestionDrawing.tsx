import { Question, User } from "../data/model.ts";
import { Canvas } from "../components/Canvas.tsx";

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
    <div className="bg-info vh-100 overflow-y-auto">
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
                <div className="d-flex my-3 justify-content-center">
                  <Canvas onSubmit={onAnswer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
