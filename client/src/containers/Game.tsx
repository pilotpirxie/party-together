import { useAppSelector } from "../data/store.ts";
import { WaitingLobby } from "./WaitingLobby.tsx";
import { Question } from "./Question.tsx";
import { Category } from "./Category.tsx";
import { Finished } from "./Finished.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Results } from "./Results.tsx";

export function Game() {
  const gameState = useAppSelector((state) => state.game.game.state);
  const stompClient = useAppSelector((state) => state.config.stompClient);
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!stompClient) {
      navigate("/", {
        state: {
          code,
        },
      });
    }
  }, [code, stompClient, navigate]);

  return (
    <div>
      {gameState === "WAITING" && <WaitingLobby />}
      {gameState === "QUESTION" && <Question />}
      {gameState === "CATEGORY" && <Category />}
      {gameState === "RESULTS" && <Results />}
      {gameState === "FINISHED" && <Finished />}
    </div>
  );
}
