export type Category = {
  id: string;
  language: string;
  mode: number;
  name: string;
  description: string;
  background: string;
  audio: string;
  primaryColor: string;
  fontFamily: string;
};

export type User = {
  id: string;
  sessionId: string;
  gameId: string;
  nickname: string;
  color: string;
  avatar: number;
  isReady: boolean;
  isTv: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Game = {
  id: string;
  code: string;
  questionIndex: number;
  state: "WAITING" | "QUESTION" | "CATEGORY" | "RESULTS" | "FINISHED";
  timerTo: null | number;
  timeToAnswer: number;
  timeToDraw: number;
  nicknamesForQuestions: string[];
  createdAt: string;
  updatedAt: string;
};

export type Question = {
  id: string;
  type: QuestionType;
  categoryId: string;
  content: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  content: string;
  questionId: string;
};

export type QuestionType = "WHAT" | "WHO" | "DRAWING";

export type AnswerHistory = {
  id: string;
  questionId: string;
  userId: string;
  answerId: string;
  selectedUserId: string;
  drawing: string;
};
