CREATE TABLE "game" (
  "id" uuid PRIMARY KEY,
  "code" varchar NOT NULL,
  "question_index" int NOT NULL,
  "timer_to" timestamp NOT NULL,
  "time_to_answer" int NOT NULL,
  "time_to_draw" int NOT NULL,
  "game_question_ids" uuid[] NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "session_id" varchar NOT NULL,
  "game_id" uuid NOT NULL,
  "nickname" varchar NOT NULL,
  "avatar" varchar NOT NULL,
  "is_ready" bool NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY,
  "language" varchar NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "background" varchar NOT NULL,
  "primary_color" varchar NOT NULL,
  "font_family" varchar NOT NULL,
  "audio" varchar NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "questions" (
  "id" uuid PRIMARY KEY,
  "type" int NOT NULL,
  "category_id" uuid NOT NULL,
  "content" varchar NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "answers" (
  "id" uuid PRIMARY KEY,
  "question_id" uuid NOT NULL,
  "content" varchar NOT NULL,
  "is_correct" bool NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "answers_history" (
  "user_id" uuid NOT NULL,
  "game_id" uuid NOT NULL,
  "question_id" uuid NOT NULL,
  "answer_id" uuid,
  "answer_url" varchar,
  "points" int NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL,
  PRIMARY KEY ("user_id", "game_id", "question_id")
);

ALTER TABLE "users" ADD FOREIGN KEY ("game_id") REFERENCES "game" ("id");

ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("answer_id") REFERENCES "answers" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("game_id") REFERENCES "game" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

