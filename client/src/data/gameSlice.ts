import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnswerHistory, Category, Game, Question, User } from "./model.ts";

export type GameState = {
  gameRoom: Game;
  questions: Question[];
  categories: Category[];
  users: User[];
  currentUser: User;
  answers: AnswerHistory[];
};

const initialState: GameState = {
  gameRoom: {
    timeToDraw: 0,
    timeToAnswer: 0,
    timerTo: null,
    questionIndex: 0,
    state: "WAITING",
    code: "",
    id: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  questions: [],
  categories: [],
  users: [],
  currentUser: {
    id: "",
    sessionId: "",
    gameId: "",
    nickname: "",
    avatar: 0,
    isReady: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  answers: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, { payload }: PayloadAction<Game>) => {
      state.gameRoom = payload;
    },
    clearGame: (state) => {
      state.gameRoom = initialState.gameRoom;
      state.questions = initialState.questions;
      state.categories = initialState.categories;
      state.users = initialState.users;
      state.currentUser = initialState.currentUser;
    },
    setQuestions: (state, { payload }: PayloadAction<Question[]>) => {
      state.questions = payload;
    },
    setCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.categories = payload;
    },
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      if (state.currentUser.id) {
        state.currentUser =
          payload.find((user) => user.id === state.currentUser.id) ||
          state.currentUser;
      }
    },
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    setAnswersHistory: (state, { payload }: PayloadAction<AnswerHistory[]>) => {
      state.answers = payload;
    },
  },
});

export const {
  setGame,
  clearGame,
  setCurrentUser,
  setUsers,
  setCategories,
  setQuestions,
  setAnswersHistory,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
