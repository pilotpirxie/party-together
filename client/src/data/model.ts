export type Category = {
  id: string;
  language: string;
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
  avatar: number;
  isReady: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Game = {
  id: string;
  code: string;
  questionIndex: number;
  currentCategoryId: null | string;
  state: "WAITING" | "QUESTION" | "CATEGORY" | "RESULT" | "FINISHED";
  timerTo: null | string;
  timeToAnswer: number;
  timeToDraw: number;
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
