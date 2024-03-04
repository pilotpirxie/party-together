import {Client, StompHeaders} from '@stomp/stompjs';
import {useAppDispatch, useAppSelector} from "../data/store.ts";
import {setIsSocketConnected, setStompClient} from "../data/configSlice.ts";
import {JoinedEvent} from "./events/incoming.ts";
import {setCategories, setCurrentUser, setGame, setQuestions, setUsers} from "../data/gameSlice.ts";

export type OutgoingMessage = {
  type: "Join",
  payload: {
    nickname: string;
    avatar: number;
    code: string;
  },
} | {
  type: "Ping",
  payload: object
}

function registerIncomingEventsHandler(stomp: Client, gameId: string) {
  stomp.subscribe(`/topic/${gameId}/UsersState`, (message) => {
    const payload = JSON.parse(message.body);
    console.log("UsersState", payload);
  });

  stomp.subscribe(`/topic/${gameId}/Ping`, (message) => {
    const payload = JSON.parse(message.body);
    console.log("Ping", payload);
  });
}

type SocketHook = {
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: OutgoingMessage, headers?: StompHeaders) => void;
  stompClient: Client | null;
}

export function useSocket(): SocketHook {
  const stompClient = useAppSelector((state) => state.config.stompClient);
  const dispatch = useAppDispatch();

  const connect = () => {
    if (stompClient?.connected) return;

    const newStompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        dispatch(setStompClient(newStompClient));

        newStompClient.subscribe("/user/queue/Joined", (message) => {
          const payload = JSON.parse(message.body) as JoinedEvent;
          console.log("Joined", JSON.stringify(payload));

          dispatch(setGame(payload.game));
          dispatch(setIsSocketConnected(true));
          dispatch(setUsers(payload.users));
          dispatch(setCurrentUser(payload.currentUser));
          dispatch(setCategories(payload.categories));
          dispatch(setQuestions(payload.questions));
          registerIncomingEventsHandler(newStompClient, payload.game.id)
        });
      }
    });

    newStompClient.activate();
  }

  const disconnect = () => {
    stompClient?.deactivate();
    dispatch(setStompClient(null));
  }

  const sendMessage = (message: OutgoingMessage, headers?: StompHeaders) => {
    stompClient?.publish({
      destination: "/app/" + message.type,
      headers,
      body: JSON.stringify(message.payload),
    });
  }

  return { connect, disconnect, sendMessage, stompClient };
}