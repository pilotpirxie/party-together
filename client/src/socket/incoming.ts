import { Category, Game, Question, User } from "../data/model.ts";
import { Client } from "@stomp/stompjs";
import { AppDispatch } from "../data/store.ts";
import { setGame, setUsers } from "../data/gameSlice.ts";

export type JoinedEvent = {
  game: Game;
  questions: Question[];
  categories: Category[];
  users: User[];
  currentUser: User;
};

export type UsersStateEvent = {
  users: User[];
};

export type GameState = {
  game: Game;
};

export function registerIncomingEventsHandler({
  stomp,
  gameId,
  dispatch,
}: {
  stomp: Client;
  gameId: string;
  dispatch: AppDispatch;
}) {
  stomp.subscribe(`/topic/${gameId}/UsersState`, (message) => {
    const payload = JSON.parse(message.body) as UsersStateEvent;
    dispatch(setUsers(payload.users));
  });

  stomp.subscribe(`/topic/${gameId}/GameState`, (message) => {
    const payload = JSON.parse(message.body) as GameState;
    dispatch(setGame(payload.game));
  });
}
