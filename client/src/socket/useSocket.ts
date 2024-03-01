import {Client, StompHeaders} from '@stomp/stompjs';
import {useAppDispatch, useAppSelector} from "../store.ts";
import {setStompClient} from "../data/configSlice.ts";

export type OutgoingMessage = {
  type: "Join",
  payload: {
    nickname: string;
    avatar: number;
    gameId: string;
  },
}

function registerIncomingEventsHandler(stomp: Client) {
  stomp.subscribe("/topic/game", (message) => {
    console.log(message);
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

        registerIncomingEventsHandler(newStompClient);
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
      destination: "/app/game/" + message.type,
      headers,
      body: JSON.stringify(message.payload),
    });
  }

  return { connect, disconnect, sendMessage, stompClient };
}