export type JoinEvent = {
  type: "Join";
  payload: {
    nickname: string;
    avatar: number;
    code: string;
  };
};

export type ToggleReadyEvent = {
  type: "ToggleReady";
};

export type StartGameEvent = {
  type: "StartGame";
};

export type OutgoingMessage = JoinEvent | ToggleReadyEvent | StartGameEvent;
