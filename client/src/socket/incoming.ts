import { Category, Game, Question, User } from "../data/model.ts";
import { Client } from "@stomp/stompjs";
import { AppDispatch } from "../data/store.ts";
import { setUsers } from "../data/gameSlice.ts";

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
}
