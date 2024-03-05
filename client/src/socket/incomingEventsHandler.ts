import { Client } from "@stomp/stompjs";
import { UsersStateEvent } from "./events/incoming.ts";
import { AppDispatch } from "../data/store.ts";
import { setUsers } from "../data/gameSlice.ts";

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
