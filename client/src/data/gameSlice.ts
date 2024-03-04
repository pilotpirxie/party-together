import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category, Game, Question, User} from "./model.ts";

export type GameState = {
  game: Game;
  questions: Question[];
  categories:  Category[];
  users:       User[];
  currentUser: User;
}

const initialState: GameState = {
  game: {
    timeToDraw: 0,
    timeToAnswer: 0,
    timerTo: new Date(),
    questionIndex: 0,
    code: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  questions: [],
  categories: [],
  users: [],
  currentUser: {
    id: "",
    sessionId: "",
    gameId: "",
    nickname: "",
    avatar: "",
    isReady: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, {payload}: PayloadAction<Game>) => {
      state.game = payload;
    },
    clearGame: (state) => {
      state.game = initialState.game;
      state.questions = initialState.questions;
      state.categories = initialState.categories;
      state.users = initialState.users;
      state.currentUser = initialState.currentUser;
    },
    setQuestions: (state, {payload}: PayloadAction<Question[]>) => {
      state.questions = payload;
    },
    setCategories: (state, {payload}: PayloadAction<Category[]>) => {
      state.categories = payload;
    },
    setUsers: (state, {payload}: PayloadAction<User[]>) => {
      state.users = payload;
    },
    setCurrentUser: (state, {payload}: PayloadAction<User>) => {
      state.currentUser = payload;
    },
  },
});

export const { setGame, clearGame, setCurrentUser, setUsers, setCategories, setQuestions } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;