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

export type ToggleTvEvent = {
  type: "ToggleTv";
};

export type StartGameEvent = {
  type: "StartGame";
};

export type ContinueToQuestionEvent = {
  type: "ContinueToQuestion";
  payload: {
    nextQuestionIndex: number;
  };
};

export type ContinueToResultsEvent = {
  type: "ContinueToResults";
};

export type SendAnswer = {
  type: "SendAnswer";
  payload: {
    questionId: string;
    answer: string;
  };
};

export type OutgoingMessage =
  | JoinEvent
  | ToggleReadyEvent
  | StartGameEvent
  | ContinueToQuestionEvent
  | SendAnswer
  | ContinueToResultsEvent
  | ToggleTvEvent;
