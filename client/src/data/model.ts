export type Category = {
  id:           string;
  language:     string;
  name:         string;
  description:  string;
  background:   string;
  audio:        string;
  primaryColor: string;
  fontFamily:   string;
}

export type User = {
  id:        string;
  sessionId: string;
  gameId:    string;
  nickname:  string;
  avatar:    string;
  isReady:   boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Game = {
  id:            string;
  code:          string;
  questionIndex: number;
  timerTo:       Date;
  timeToAnswer:  number;
  timeToDraw:    number;
  createdAt:     Date;
  updatedAt:     Date;
}

export type Question = {
  id:         string;
  type:       number;
  categoryId: string;
  content:    string;
  answers:    Answer[];
}

export type Answer = {
  id:         string;
  content:    string;
  questionId: string;
  isCorrect:  boolean;
}
