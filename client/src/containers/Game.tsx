import { useAppSelector } from "../data/store.ts";
import { Waiting } from "./Waiting.tsx";
import { Question } from "./Question.tsx";
import { Category } from "./Category.tsx";
import { Finished } from "./Finished.tsx";
import { Result } from "./Result.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export function Game() {
  const gameState = useAppSelector((state) => state.game);
  const configState = useAppSelector((state) => state.config);
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!configState.stompClient) {
      navigate("/", {
        state: {
          code,
        },
      });
    }
  }, [code, configState.stompClient, navigate]);

  return (
    <div>
      {gameState.game.state === "WAITING" && <Waiting />}
      {gameState.game.state === "QUESTION" && <Question />}
      {gameState.game.state === "CATEGORY" && <Category />}
      {gameState.game.state === "RESULT" && <Result />}
      {gameState.game.state === "FINISHED" && <Finished />}
    </div>
  );
}
