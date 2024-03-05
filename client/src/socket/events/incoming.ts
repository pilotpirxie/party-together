import { Category, Game, Question, User } from "../../data/model.ts";

export type JoinedEvent = {
  game: Game;
  questions: Question[];
  categories: Category[];
  users: User[];
  currentUser: User;
};

export type UsersStateEvent = {
  users: User[];
};
