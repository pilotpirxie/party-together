CREATE TABLE "game" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "code" varchar NOT NULL UNIQUE,
  "question_index" int NOT NULL,
  "state" varchar NOT NULL,
  "timer_to" timestamp,
  "time_to_answer" int NOT NULL,
  "time_to_draw" int NOT NULL,
  "game_question_ids" uuid[] NOT NULL,
  "game_category_ids" uuid[] NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE INDEX "game_code_index" ON "game" ("code");

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "session_id" varchar NOT NULL,
  "game_id" uuid NOT NULL,
  "nickname" varchar NOT NULL,
  "avatar" int NOT NULL,
  "color" varchar NOT NULL,
  "is_ready" bool NOT NULL,
  "connected" bool NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE INDEX "users_session_id_index" ON "users" ("session_id");

CREATE INDEX "users_game_id_index" ON "users" ("game_id");

CREATE INDEX "users_composite_session_game_id_index" ON "users" ("session_id", "game_id");

CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "mode" int NOT NULL,
  "background" varchar NOT NULL,
  "primary_color" varchar NOT NULL,
  "audio" varchar NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "questions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "type" varchar NOT NULL,
  "category_id" uuid NOT NULL,
  "content" varchar NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE INDEX "questions_category_id_index" ON "questions" ("category_id");

CREATE INDEX "questions_type_index" ON "questions" ("type");

CREATE TABLE "answers" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "question_id" uuid NOT NULL,
  "content" varchar NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE INDEX "answers_question_id_index" ON "answers" ("question_id");

CREATE TABLE "answers_history" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "game_id" uuid NOT NULL,
  "question_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "answer_id" uuid,
  "selected_user_id" uuid,
  "drawing" text,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE INDEX "answers_history_game_id_index" ON "answers_history" ("game_id");

CREATE INDEX "answers_history_question_id_index" ON "answers_history" ("question_id");

CREATE INDEX "answers_history_user_id_index" ON "answers_history" ("user_id");

CREATE INDEX "answers_history_answer_id_index" ON "answers_history" ("answer_id");

CREATE INDEX "answers_history_selected_user_id_index" ON "answers_history" ("selected_user_id");

CREATE INDEX "answers_history_composite_game_question_user_index" ON "answers_history" ("game_id", "question_id", "user_id");

CREATE INDEX "answers_history_composite_game_question_index" ON "answers_history" ("game_id", "question_id");

ALTER TABLE "users" ADD FOREIGN KEY ("game_id") REFERENCES "game" ("id");

ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("answer_id") REFERENCES "answers" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("game_id") REFERENCES "game" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "answers_history" ADD FOREIGN KEY ("selected_user_id") REFERENCES "users" ("id");

INSERT INTO public.categories VALUES ('0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Podróże', 'Wsiąść do pociągu byle jakiego', 0, '', '', '', '2024-03-03 19:20:46.52023', '2024-03-03 19:20:46.52023');
INSERT INTO public.categories VALUES ('85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Abstrakcja', 'Nietypowe pytania, nietypowe odpowiedzi', 0, '', '', '', '2024-03-03 19:22:06.294808', '2024-03-03 19:22:06.294808');
INSERT INTO public.categories VALUES ('362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Superbohaterowie', 'O supermocach i stylowych wdziankach', 0, '', '', '', '2024-03-03 19:24:52.80822', '2024-03-03 19:24:52.80822');
INSERT INTO public.categories VALUES ('7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Lifestyle', 'Pogadajmy o stylu życia', 0, '', '', '', '2024-03-03 19:23:46.971367', '2024-03-03 19:23:46.971367');

/* Questions - What someone would do... */
INSERT INTO public.questions VALUES ('c3583998-9f24-4562-a02a-9e234294fae7', 'WHAT', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Jakie miejsce wybrałby NICKNAME na wakacje?', default, default);
INSERT INTO public.answers VALUES (default, 'c3583998-9f24-4562-a02a-9e234294fae7', 'Góry',default, default);
INSERT INTO public.answers VALUES (default, 'c3583998-9f24-4562-a02a-9e234294fae7', 'Morze',default, default);
INSERT INTO public.answers VALUES (default, 'c3583998-9f24-4562-a02a-9e234294fae7', 'Plażę',default, default);
INSERT INTO public.answers VALUES (default, 'c3583998-9f24-4562-a02a-9e234294fae7', 'Park',default, default);
INSERT INTO public.answers VALUES (default, 'c3583998-9f24-4562-a02a-9e234294fae7', 'Lokalnego fast fooda',default, default);
INSERT INTO public.answers VALUES (default, 'c3583998-9f24-4562-a02a-9e234294fae7', 'Klub',default, default);
INSERT INTO public.answers VALUES (default, 'c3583998-9f24-4562-a02a-9e234294fae7', 'Jezioro',default, default);
INSERT INTO public.questions VALUES ('7cc75cc7-fe7d-465e-b298-c9e275be0de0', 'WHAT', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Jakie jest wymarzone miejsce NICKNAME na zimową przerwę?', default, default);
INSERT INTO public.answers VALUES (default, '7cc75cc7-fe7d-465e-b298-c9e275be0de0', 'Ciepły kraj',default, default);
INSERT INTO public.answers VALUES (default, '7cc75cc7-fe7d-465e-b298-c9e275be0de0', 'Zimowe sporty',default, default);
INSERT INTO public.answers VALUES (default, '7cc75cc7-fe7d-465e-b298-c9e275be0de0', 'Praca lub nauka',default, default);
INSERT INTO public.answers VALUES (default, '7cc75cc7-fe7d-465e-b298-c9e275be0de0', 'Czas z rodziną',default, default);
INSERT INTO public.answers VALUES (default, '7cc75cc7-fe7d-465e-b298-c9e275be0de0', 'Kampienie na de_dust2',default, default);
INSERT INTO public.answers VALUES (default, '7cc75cc7-fe7d-465e-b298-c9e275be0de0', 'Remont',default, default);
INSERT INTO public.questions VALUES ('683df1fd-61bb-403f-8407-a46ddedbdd4f', 'WHAT', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Co NICKNAME zabrałby na bezludną wyspę?', default, default);
INSERT INTO public.answers VALUES (default, '683df1fd-61bb-403f-8407-a46ddedbdd4f', 'Książkę',default, default);
INSERT INTO public.answers VALUES (default, '683df1fd-61bb-403f-8407-a46ddedbdd4f', 'Nóż',default, default);
INSERT INTO public.answers VALUES (default, '683df1fd-61bb-403f-8407-a46ddedbdd4f', 'Zapasy',default, default);
INSERT INTO public.answers VALUES (default, '683df1fd-61bb-403f-8407-a46ddedbdd4f', 'Planszówkę',default, default);
INSERT INTO public.answers VALUES (default, '683df1fd-61bb-403f-8407-a46ddedbdd4f', 'Przewodnik survivalu',default, default);
INSERT INTO public.answers VALUES (default, '683df1fd-61bb-403f-8407-a46ddedbdd4f', 'Książkę kucharską',default, default);
INSERT INTO public.questions VALUES ('195435a7-7c54-48a1-b440-7ba49270cf6d', 'WHAT', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Co NICKNAME zrobiłby gdyby spotkał tubylców na dzikiej wyspie?', default, default);
INSERT INTO public.answers VALUES (default, '195435a7-7c54-48a1-b440-7ba49270cf6d', 'Zacząłby uczyć ich polskiego',default, default);
INSERT INTO public.answers VALUES (default, '195435a7-7c54-48a1-b440-7ba49270cf6d', 'Zorganizował z nimi melanż',default, default);
INSERT INTO public.answers VALUES (default, '195435a7-7c54-48a1-b440-7ba49270cf6d', 'Zagrałby w piłkę nożną',default, default);
INSERT INTO public.answers VALUES (default, '195435a7-7c54-48a1-b440-7ba49270cf6d', 'Uczył od nich tańca',default, default);
INSERT INTO public.answers VALUES (default, '195435a7-7c54-48a1-b440-7ba49270cf6d', 'Rozkochał córkę/syna ich wodza',default, default);
INSERT INTO public.answers VALUES (default, '195435a7-7c54-48a1-b440-7ba49270cf6d', 'Nauczył się ich języka',default, default);
INSERT INTO public.questions VALUES ('1bf0a070-c945-4f82-b2ff-93427211ad0f', 'WHAT', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Co NICKNAME robi by zminimalizować jet lag?', default, default);
INSERT INTO public.answers VALUES (default, '1bf0a070-c945-4f82-b2ff-93427211ad0f', 'Pije dużo wody',default, default);
INSERT INTO public.answers VALUES (default, '1bf0a070-c945-4f82-b2ff-93427211ad0f', 'Przesypia cały dzień',default, default);
INSERT INTO public.answers VALUES (default, '1bf0a070-c945-4f82-b2ff-93427211ad0f', 'Zażywa melatoninę',default, default);
INSERT INTO public.answers VALUES (default, '1bf0a070-c945-4f82-b2ff-93427211ad0f', 'Pij energetyki',default, default);
INSERT INTO public.answers VALUES (default, '1bf0a070-c945-4f82-b2ff-93427211ad0f', 'Pije alkohol',default, default);
INSERT INTO public.answers VALUES (default, '1bf0a070-c945-4f82-b2ff-93427211ad0f', 'Idzie pobiegać',default, default);
INSERT INTO public.questions VALUES ('114c4a5b-1bd0-4a84-b07b-f9962c51ad08', 'WHAT', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Co NICKNAME zrobiłby gdyby zgubił bagaż na lotnisku?', default, default);
INSERT INTO public.answers VALUES (default, '114c4a5b-1bd0-4a84-b07b-f9962c51ad08', 'Zgłosił zaginięcie',default, default);
INSERT INTO public.answers VALUES (default, '114c4a5b-1bd0-4a84-b07b-f9962c51ad08', 'Założył nowe życie',default, default);
INSERT INTO public.answers VALUES (default, '114c4a5b-1bd0-4a84-b07b-f9962c51ad08', 'Zaczął panikować',default, default);
INSERT INTO public.answers VALUES (default, '114c4a5b-1bd0-4a84-b07b-f9962c51ad08', 'Bagaż? Jaki bagaż',default, default);
INSERT INTO public.questions VALUES ('80f19a2b-8900-483d-abc0-dba407949ff4', 'WHAT', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Jaką pamiątkę przywiózłby NICKNAME z podróży?', default, default);
INSERT INTO public.answers VALUES (default, '80f19a2b-8900-483d-abc0-dba407949ff4', 'Muszelkę z plaży',default, default);
INSERT INTO public.answers VALUES (default, '80f19a2b-8900-483d-abc0-dba407949ff4', 'Kawa z lokalnego targu',default, default);
INSERT INTO public.answers VALUES (default, '80f19a2b-8900-483d-abc0-dba407949ff4', 'Lokalny alkohol',default, default);
INSERT INTO public.answers VALUES (default, '80f19a2b-8900-483d-abc0-dba407949ff4', 'Magnes na lodówkę',default, default);
INSERT INTO public.answers VALUES (default, '80f19a2b-8900-483d-abc0-dba407949ff4', 'Pamiątkowy kubek',default, default);
INSERT INTO public.answers VALUES (default, '80f19a2b-8900-483d-abc0-dba407949ff4', 'Kamyk lub liść z parku',default, default);
INSERT INTO public.questions VALUES ('95a4f8f0-5b6d-4bde-95e9-36c7207857bf', 'WHAT', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Co NICKNAME zrobiłby gdyby spotkał Pana Kleksa?', default, default);
INSERT INTO public.answers VALUES (default, '95a4f8f0-5b6d-4bde-95e9-36c7207857bf', 'Zapytałby co tam u szpaka Mateusza',default, default);
INSERT INTO public.answers VALUES (default, '95a4f8f0-5b6d-4bde-95e9-36c7207857bf', 'Zapytałby o przepis na kolorowe ciasto',default, default);
INSERT INTO public.answers VALUES (default, '95a4f8f0-5b6d-4bde-95e9-36c7207857bf', 'Zapytałby gdzie są jego piegi',default, default);
INSERT INTO public.answers VALUES (default, '95a4f8f0-5b6d-4bde-95e9-36c7207857bf', 'Zapytałby o kaczkę dziwaczkę',default, default);
INSERT INTO public.questions VALUES ('a07b7406-de40-48df-b586-a0d67e9969e4', 'WHAT', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Gdyby NICKNAME był zwierzęciem, to jakim?', default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Kotem',default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Psem',default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Papugą',default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Pająkiem',default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Słoniem',default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Koalą',default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Koniem',default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Leniwcem',default, default);
INSERT INTO public.answers VALUES (default, 'a07b7406-de40-48df-b586-a0d67e9969e4', 'Alpaką',default, default);
INSERT INTO public.questions VALUES ('64f9bfe5-9f82-4edb-b5f5-e6617d8d6c4d', 'WHAT', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Co NICKNAME zrobiłby gdyby mógł latać?', default, default);
INSERT INTO public.answers VALUES (default, '64f9bfe5-9f82-4edb-b5f5-e6617d8d6c4d', 'Latałby nad miastem bez celu',default, default);
INSERT INTO public.answers VALUES (default, '64f9bfe5-9f82-4edb-b5f5-e6617d8d6c4d', 'Podglądał ludzi przez okna',default, default);
INSERT INTO public.answers VALUES (default, '64f9bfe5-9f82-4edb-b5f5-e6617d8d6c4d', 'Zostałby superbohaterem',default, default);
INSERT INTO public.answers VALUES (default, '64f9bfe5-9f82-4edb-b5f5-e6617d8d6c4d', 'Wreszcie przestałby się spóźniać',default, default);
INSERT INTO public.answers VALUES (default, '64f9bfe5-9f82-4edb-b5f5-e6617d8d6c4d', 'Zostałby superzłoczyńcą',default, default);
INSERT INTO public.questions VALUES ('7c330c31-e8d1-407c-b998-d7eee9532a2c', 'WHAT', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Gdyby NICKNAME mógł zmienić kształt to na jaki?', default, default);
INSERT INTO public.answers VALUES (default, '7c330c31-e8d1-407c-b998-d7eee9532a2c', 'Byłby gadającym młotkiem',default, default);
INSERT INTO public.answers VALUES (default, '7c330c31-e8d1-407c-b998-d7eee9532a2c', 'Byłby kotem na dwóch nogach',default, default);
INSERT INTO public.answers VALUES (default, '7c330c31-e8d1-407c-b998-d7eee9532a2c', 'Zostałby krową',default, default);
INSERT INTO public.answers VALUES (default, '7c330c31-e8d1-407c-b998-d7eee9532a2c', 'Zostałby posągiem',default, default);
INSERT INTO public.answers VALUES (default, '7c330c31-e8d1-407c-b998-d7eee9532a2c', 'Zmieniałby się w gitarę',default, default);
INSERT INTO public.answers VALUES (default, '7c330c31-e8d1-407c-b998-d7eee9532a2c', 'Zostałby kaktusem',default, default);
INSERT INTO public.questions VALUES ('7de0d09e-a9a9-4392-9a06-433271de76c7', 'WHAT', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Jak NICKNAME zareagowałby na atak zombie?', default, default);
INSERT INTO public.answers VALUES (default, '7de0d09e-a9a9-4392-9a06-433271de76c7', 'Zacząłby trenować parkour',default, default);
INSERT INTO public.answers VALUES (default, '7de0d09e-a9a9-4392-9a06-433271de76c7', 'Zacząłby trenować sztuki walki',default, default);
INSERT INTO public.answers VALUES (default, '7de0d09e-a9a9-4392-9a06-433271de76c7', 'Zacząłby trenować strzelectwo',default, default);
INSERT INTO public.answers VALUES (default, '7de0d09e-a9a9-4392-9a06-433271de76c7', 'Zacząłby trenować przetrwanie',default, default);
INSERT INTO public.answers VALUES (default, '7de0d09e-a9a9-4392-9a06-433271de76c7', 'Zacząłby trenować medycynę',default, default);
INSERT INTO public.answers VALUES (default, '7de0d09e-a9a9-4392-9a06-433271de76c7', 'Zacząłby panikować',default, default);
INSERT INTO public.questions VALUES ('d3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'WHAT', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Gdyby NICKNAME był superbohaterem, to jakim?', default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Thorem',default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Iron Manem',default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Spider-Manem',default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Hulkiem',default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Deadpoolem',default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Batmanem',default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Czarną Wdową',default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Wolverinem',default, default);
INSERT INTO public.answers VALUES (default, 'd3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Wonder Woman',default, default);
INSERT INTO public.questions VALUES ('a29aa177-5b16-49bd-b595-4debd84519db', 'WHAT', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Gdyby NICKNAME miał jedną supermoc to jaką?', default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Latanie',default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Niewidzialność',default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Super siła',default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Teleportacja',default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Telekineza',default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Super inteligencja',default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Regeneracja',default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Super szybkość',default, default);
INSERT INTO public.answers VALUES (default, 'a29aa177-5b16-49bd-b595-4debd84519db', 'Super zmysły',default, default);
INSERT INTO public.questions VALUES ('78b850f4-fbce-45a6-b905-a48fcb71725b', 'WHAT', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Jak NICKNAME zabezpieczyłby swoją tożsamość przed światem, będąc superbohaterem?', default, default);
INSERT INTO public.answers VALUES (default, '78b850f4-fbce-45a6-b905-a48fcb71725b', 'Zmieniłby fryzurę',default, default);
INSERT INTO public.answers VALUES (default, '78b850f4-fbce-45a6-b905-a48fcb71725b', 'Nosiłby płaszcz',default, default);
INSERT INTO public.answers VALUES (default, '78b850f4-fbce-45a6-b905-a48fcb71725b', 'Wychodził tylko w nocy',default, default);
INSERT INTO public.answers VALUES (default, '78b850f4-fbce-45a6-b905-a48fcb71725b', 'Chodziłby boso',default, default);
INSERT INTO public.questions VALUES ('8011df77-e6c4-4d80-97dc-1e59025ef722', 'WHAT', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Jak NICKNAME wykorzystałby umiejętność mówienia z roślinami podczas randek?', default, default);
INSERT INTO public.answers VALUES (default, '8011df77-e6c4-4d80-97dc-1e59025ef722', 'Pytałby ich o porady sercowe',default, default);
INSERT INTO public.answers VALUES (default, '8011df77-e6c4-4d80-97dc-1e59025ef722', 'Poprosił by rozkwitły dokładnie przy wręczaniu',default, default);
INSERT INTO public.answers VALUES (default, '8011df77-e6c4-4d80-97dc-1e59025ef722', 'Poprosił o wykonaniu zwiadu gdy już będzie w domu',default, default);
INSERT INTO public.answers VALUES (default, '8011df77-e6c4-4d80-97dc-1e59025ef722', 'Powtarzałby ich dowcipy',default, default);
INSERT INTO public.questions VALUES ('335c8f9a-9491-4b8a-a664-5d1fbcf76e69', 'WHAT', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Jak NICKNAME wykorzystałby umiejętność kontrolowania pogody?', default, default);
INSERT INTO public.answers VALUES (default, '335c8f9a-9491-4b8a-a664-5d1fbcf76e69', 'Zrobiłby deszcz na ślubie swojego wroga',default, default);
INSERT INTO public.answers VALUES (default, '335c8f9a-9491-4b8a-a664-5d1fbcf76e69', 'Idealna pogoda podczas selfie',default, default);
INSERT INTO public.answers VALUES (default, '335c8f9a-9491-4b8a-a664-5d1fbcf76e69', 'Myłby samochód deszczem',default, default);
INSERT INTO public.answers VALUES (default, '335c8f9a-9491-4b8a-a664-5d1fbcf76e69', 'Silny wiatr by pranie szybko wyschło',default, default);
INSERT INTO public.questions VALUES ('ce3d580f-37d6-4daf-a50b-e02c6aa3ef10', 'WHAT', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Kto byłby arcywrogiem NICKNAME?', default, default);
INSERT INTO public.answers VALUES (default, 'ce3d580f-37d6-4daf-a50b-e02c6aa3ef10', 'Pani od matematyki',default, default);
INSERT INTO public.answers VALUES (default, 'ce3d580f-37d6-4daf-a50b-e02c6aa3ef10', 'Kolega z klasy',default, default);
INSERT INTO public.answers VALUES (default, 'ce3d580f-37d6-4daf-a50b-e02c6aa3ef10', 'Szef',default, default);
INSERT INTO public.answers VALUES (default, 'ce3d580f-37d6-4daf-a50b-e02c6aa3ef10', 'Koleżanka z pracy',default, default);
INSERT INTO public.answers VALUES (default, 'ce3d580f-37d6-4daf-a50b-e02c6aa3ef10', 'Osiedlowy żul',default, default);
INSERT INTO public.answers VALUES (default, 'ce3d580f-37d6-4daf-a50b-e02c6aa3ef10', 'Pies sąsiada',default, default);
INSERT INTO public.answers VALUES (default, 'ce3d580f-37d6-4daf-a50b-e02c6aa3ef10', 'Kierowca autobusu',default, default);
INSERT INTO public.questions VALUES ('d4cffdc4-6d23-4b67-b0ff-91a6db8ac721', 'WHAT', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Co znajduje się na szczycie listy zakupów NICKNAME?', default, default);
INSERT INTO public.answers VALUES (default, 'd4cffdc4-6d23-4b67-b0ff-91a6db8ac721', 'PlayStation',default, default);
INSERT INTO public.answers VALUES (default, 'd4cffdc4-6d23-4b67-b0ff-91a6db8ac721', 'Nowe felgi',default, default);
INSERT INTO public.answers VALUES (default, 'd4cffdc4-6d23-4b67-b0ff-91a6db8ac721', 'Buty Jordany',default, default);
INSERT INTO public.answers VALUES (default, 'd4cffdc4-6d23-4b67-b0ff-91a6db8ac721', 'Szampon do brody',default, default);
INSERT INTO public.answers VALUES (default, 'd4cffdc4-6d23-4b67-b0ff-91a6db8ac721', 'Dobrej jakości herbata',default, default);
INSERT INTO public.answers VALUES (default, 'd4cffdc4-6d23-4b67-b0ff-91a6db8ac721', 'Grube skarpetki',default, default);
INSERT INTO public.answers VALUES (default, 'd4cffdc4-6d23-4b67-b0ff-91a6db8ac721', 'Książka o kosmitach',default, default);
INSERT INTO public.questions VALUES ('6aec81f7-3587-466f-ac7a-5d46f6d33d35', 'WHAT', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Jak NICKNAME relaksuje się po ciężkim dniu?', default, default);
INSERT INTO public.answers VALUES (default, '6aec81f7-3587-466f-ac7a-5d46f6d33d35', 'Gra w gry',default, default);
INSERT INTO public.answers VALUES (default, '6aec81f7-3587-466f-ac7a-5d46f6d33d35', 'Ogląda seriale',default, default);
INSERT INTO public.answers VALUES (default, '6aec81f7-3587-466f-ac7a-5d46f6d33d35', 'Czyta książki',default, default);
INSERT INTO public.answers VALUES (default, '6aec81f7-3587-466f-ac7a-5d46f6d33d35', 'Spaceruje',default, default);
INSERT INTO public.answers VALUES (default, '6aec81f7-3587-466f-ac7a-5d46f6d33d35', 'Ćwiczy',default, default);
INSERT INTO public.answers VALUES (default, '6aec81f7-3587-466f-ac7a-5d46f6d33d35', 'Gotuje',default, default);
INSERT INTO public.answers VALUES (default, '6aec81f7-3587-466f-ac7a-5d46f6d33d35', 'Ogląda koty na YouTube',default, default);
INSERT INTO public.questions VALUES ('8eeae9b2-90c9-4db3-a218-a6cddafeed4a', 'WHAT', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Jaki gadżet NICKNAME chciałby wynaleźć?', default, default);
INSERT INTO public.answers VALUES (default, '8eeae9b2-90c9-4db3-a218-a6cddafeed4a', 'Spodnie z automatyczną zmianą długości',default, default);
INSERT INTO public.answers VALUES (default, '8eeae9b2-90c9-4db3-a218-a6cddafeed4a', 'Tłumacz na język psów i kotów',default, default);
INSERT INTO public.answers VALUES (default, '8eeae9b2-90c9-4db3-a218-a6cddafeed4a', 'Parasolka generująca pole siłowe',default, default);
INSERT INTO public.answers VALUES (default, '8eeae9b2-90c9-4db3-a218-a6cddafeed4a', 'Buty do chodzenia po suficie',default, default);
INSERT INTO public.answers VALUES (default, '8eeae9b2-90c9-4db3-a218-a6cddafeed4a', 'Butelkę z nieskończoną pojemnością',default, default);
INSERT INTO public.answers VALUES (default, '8eeae9b2-90c9-4db3-a218-a6cddafeed4a', 'Koc, który zawsze jest ciepły',default, default);
INSERT INTO public.questions VALUES ('a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'WHAT', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Jaki jest ulubiony serial NICKNAME?', default, default);
INSERT INTO public.answers VALUES (default, 'a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'Gra o tron',default, default);
INSERT INTO public.answers VALUES (default, 'a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'Breaking Bad',default, default);
INSERT INTO public.answers VALUES (default, 'a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'Stranger Things',default, default);
INSERT INTO public.answers VALUES (default, 'a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'The Office',default, default);
INSERT INTO public.answers VALUES (default, 'a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'Friends',default, default);
INSERT INTO public.answers VALUES (default, 'a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'The Mandalorian',default, default);
INSERT INTO public.answers VALUES (default, 'a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'The Witcher',default, default);
INSERT INTO public.answers VALUES (default, 'a6d76ac1-5845-4c78-8ba7-331bff0b02a3', 'The Crown',default, default);
INSERT INTO public.questions VALUES ('8746101e-5505-4673-ba7f-de0a84548369', 'WHAT', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Jaki jest ulubiony gadżet kuchenny NICKNAME?', default, default);
INSERT INTO public.answers VALUES (default, '8746101e-5505-4673-ba7f-de0a84548369', 'Robot kuchenny',default, default);
INSERT INTO public.answers VALUES (default, '8746101e-5505-4673-ba7f-de0a84548369', 'Kuchenka mikrofalowa',default, default);
INSERT INTO public.answers VALUES (default, '8746101e-5505-4673-ba7f-de0a84548369', 'Ekspres do kawy',default, default);
INSERT INTO public.answers VALUES (default, '8746101e-5505-4673-ba7f-de0a84548369', 'Toster',default, default);
INSERT INTO public.answers VALUES (default, '8746101e-5505-4673-ba7f-de0a84548369', 'Blender',default, default);
INSERT INTO public.answers VALUES (default, '8746101e-5505-4673-ba7f-de0a84548369', 'Sztućce do sushi',default, default);
INSERT INTO public.answers VALUES (default, '8746101e-5505-4673-ba7f-de0a84548369', 'Siekacz do warzyw',default, default);

/* Questions - Who would do... */
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby wygrać konkurs na najdziwniejsze hobby?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto zrobiłby żart nawet w środku egzaminu?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby przekształcić katastrofę kulinarną w sztukę kulinarną?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby zacząć taniec spontanicznie na środku ulicy?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto mógłby przekonać wilka do jedzenia sałatki?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto mógłby przetrwać na bezludnej wyspie, mając tylko zestaw do gry w Monopoly?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby zrobić selfie nawet w najbardziej absurdalnej sytuacji?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto mógłby przekonać swoich rodziców, że jest naprawdę Batmanem?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby spędzać całe dnie oglądając koty na YouTube?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto mógłby spróbować wynająć pingwina jako osobistego asystenta?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto mógłby oświetlić cały pokój samymi swoimi pomysłami?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby zamienić czytanie zlepku instrukcji obsługi w najciekawszą historię świata?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby założyć orkiestrę z instrumentów z kuchni?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto mógłby zorganizować zawody w skakaniu na jednej nodze na całym osiedlu?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto mógłby przetrwać dzień bez kawy?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby zjeść najwięcej placków w konkursie jedzenia placków?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto mógłby zaproponować najdziwniejszy nowy smak lodów?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto byłby członkiem zespołu heavymetalowego?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto miałby największy problem z codziennymi czynnościami, takimi jak zakupy spożywcze?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Kto najlepiej sprawdziłby się jako bohater filmu akcji?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto mógłby być bohaterem komedii?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Kto sprzedałby cokolwiek za pizze, hot-doga lub kebaba?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Kto jako pierwszy zostałby zombie?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Kto zostałby geniuszem zła?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Kto zostałby bohaterem Superczupryna?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Kto byłby skłonny dać ukąsić się pająkowi by dostać supermoce?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Kto mógłby przekonać kierowcę autobusu do zrobienia przerwy na lody?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Kto śpiąc w pociągu, mógłby obudzić się w innym kraju?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Kto utknąłby na lotniku w innym kraju bez pieniędzy?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Kto pojechałby na wakacje do kraju, którego nie ma na mapie?', default, default);
INSERT INTO public.questions VALUES (default, 'WHO', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Kto nauczony przez babcię, mógłby przetrwać w dziczy?', default, default);

/* Questions - Drawing... */
INSERT INTO public.questions VALUES (default, 'DRAWING', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Narysuj NICKNAME jako stewardessę', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Narysuj NICKNAME jako konduktora', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Narysuj autobus z czasu PRL', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Narysuj miejsce, które kojarzy ci się najmilej', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '0a627905-eea5-4b9d-958a-f7f8a4b81393', 'Narysuj NICKNAME na wakacjach', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Narysuj jak wyglądałby NICKNAME jako zwierze', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Narysuj NICKNAME jako lodówkę', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Narysuj NICKNAME jako kogoś kto poznał pradawną wiedzę', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Narysuj słoneczniki trzymane przez NICKNAME', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '85e58c08-6438-4a79-bf7a-b687d994a3d5', 'Narysuj was w tej chwili', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Narysuj NICKNAME jako superbohatera/kę', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Narysuj NICKNAME jako pomocnika superbohatera', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '362cd6aa-f040-4dd3-90f1-4c8b96aa6757', 'Narysuj NICKNAME jako Kobietę Kota', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Narysuj NICKNAME na imprezie', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Narysuj NICKNAME podczas gotowania', default, default);
INSERT INTO public.questions VALUES (default, 'DRAWING', '7fb79242-35f8-48b4-a7e9-ddf7f959b5af', 'Narysuj NICKNAME gdy słucha muzyki', default, default);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nickname;