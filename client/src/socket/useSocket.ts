import { Client, StompHeaders } from "@stomp/stompjs";
import { useAppDispatch, useAppSelector } from "../data/store.ts";
import { setIsSocketConnected, setStompClient } from "../data/configSlice.ts";
import { JoinedEvent, registerIncomingEventsHandler } from "./incoming.ts";
import {
  clearGame,
  setCategories,
  setCurrentUser,
  setGame,
  setQuestions,
  setUsers,
} from "../data/gameSlice.ts";
import { OutgoingMessage } from "./outgoing.ts";

type SocketHook = {
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: OutgoingMessage, headers?: StompHeaders) => void;
  stompClient: Client | null;
};

export function useSocket(): SocketHook {
  const stompClient = useAppSelector((state) => state.config.stompClient);
  const dispatch = useAppDispatch();

  const connect = async () => {
    if (stompClient?.connected) {
      await stompClient.deactivate();
    }

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

          registerIncomingEventsHandler({
            stomp: newStompClient,
            gameId: payload.game.id.toString(),
            dispatch,
          });
        });
      },
    });

    newStompClient.activate();
    newStompClient.onDisconnect = () => {
      dispatch(setIsSocketConnected(false));
      dispatch(clearGame());
    };
  };

  const disconnect = () => {
    stompClient?.deactivate();
    dispatch(setStompClient(null));
  };

  const sendMessage = (message: OutgoingMessage, headers?: StompHeaders) => {
    stompClient?.publish({
      destination: "/app/" + message.type,
      headers,
      body: JSON.stringify(message.payload),
    });
  };

  return { connect, disconnect, sendMessage, stompClient };
}
