export type JoinEvent = {
  type: "Join";
  payload: {
    nickname: string;
    avatar: number;
    code: string;
  };
};

export type OutgoingMessage = JoinEvent;
