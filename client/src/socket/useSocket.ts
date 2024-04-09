import { Client, StompHeaders } from "@stomp/stompjs";
import { useAppDispatch, useAppSelector } from "../data/store.ts";
import { setIsSocketConnected, setStompClient } from "../data/configSlice.ts";
import { JoinedEvent, registerIncomingEventsHandler } from "./incoming.ts";
import {
  clearGame,
  setAnswersHistory,
  setCategories,
  setCurrentUser,
  setGame,
  setQuestions,
  setUsers,
} from "../data/gameSlice.ts";
import { OutgoingMessage } from "./outgoing.ts";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { BASE_WS_URL } from "../utils/config.ts";

type ConnectAndJoinType = {
  type: "join";
  nickname: string;
  color: string;
  avatar: number;
  code: string;
};

type ConnectAndCreateType = {
  type: "create";
  nickname: string;
  color: string;
  avatar: number;
  code: string;
  mode: number;
  timeToAnswer: number;
  timeToDraw: number;
};

type SocketHook = {
  connect: (connect: ConnectAndJoinType | ConnectAndCreateType) => void;
  sendMessage: (message: OutgoingMessage, headers?: StompHeaders) => void;
  stompClient: Client | null;
};

export function useSocket(): SocketHook {
  const stompClient = useAppSelector((state) => state.config.stompClient);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const connect = async (
    connectionPayload: ConnectAndJoinType | ConnectAndCreateType,
  ) => {
    const { type, nickname, color, avatar, code } = connectionPayload;

    if (stompClient?.connected) {
      await stompClient.deactivate();
    }

    const newStompClient = new Client({
      brokerURL: BASE_WS_URL,
      onConnect: () => {
        dispatch(setStompClient(newStompClient));

        newStompClient.subscribe("/user/queue/Joined", (message) => {
          const payload = JSON.parse(message.body) as JoinedEvent;

          dispatch(setGame(payload.game));
          dispatch(setIsSocketConnected(true));
          dispatch(setUsers(payload.users));
          dispatch(setCurrentUser(payload.currentUser));
          dispatch(setCategories(payload.categories));
          dispatch(setQuestions(payload.questions));
          dispatch(setAnswersHistory(payload.answers));

          registerIncomingEventsHandler({
            stomp: newStompClient,
            gameId: payload.game.id.toString(),
            dispatch,
          });
          localStorage.setItem("code", payload.game.code);
          localStorage.setItem("codeDate", dayjs().toISOString());
          navigate(`/game/${payload.game.code}`);
        });

        if (type === "join") {
          newStompClient?.publish({
            destination: "/app/Join",
            headers: {},
            body: JSON.stringify({
              nickname,
              color,
              code,
              avatar,
            }),
          });
        } else {
          newStompClient?.publish({
            destination: "/app/CreateNewGame",
            headers: {},
            body: JSON.stringify({
              nickname,
              color,
              code,
              avatar,
              mode: connectionPayload.mode,
              timeToAnswer: connectionPayload.timeToAnswer,
              timeToDraw: connectionPayload.timeToDraw,
            }),
          });
        }
      },
    });

    newStompClient.activate();
    newStompClient.onDisconnect = () => {
      dispatch(setIsSocketConnected(false));
      dispatch(clearGame());
    };
  };

  const sendMessage = (message: OutgoingMessage, headers?: StompHeaders) => {
    stompClient?.publish({
      destination: "/app/" + message.type,
      headers,
      body: "payload" in message ? JSON.stringify(message.payload) : undefined,
    });
  };

  return { connect, sendMessage, stompClient };
}
