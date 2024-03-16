import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: "en",
    resources: {
      pl: {
        translation: {
          "Roll avatar": "Wylosuj avatar",
          Nickname: "Pseudonim",
          "Game code": "Kod gry",
          "Join game": "Dołącz do gry",
          "Create new game": "Stwórz nową grę",
          "Game created by": "Gra stworzona przez",
          and: "i",
          "Show the first question!": "Pokaż pierwsze pytanie!",
          Continue: "Kontynuuj",
          "Waiting for other players...": "Oczekiwanie na innych graczy...",
          "Ready!": "Gotowy!",
          "Don't wait, continue!": "Nie czekaj, kontynuuj!",
          "Waiting for players...": "Oczekiwanie na graczy...",
          Code: "Kod",
          "Scan to join the game": "Zeskanuj, aby dołączyć do gry",
          "Mark as ready": "Oznacz jako gotowy",
          "You are ready!": "Jesteś gotowy!",
          "Everyone is ready?": "Wszyscy są gotowi?",
          "Start the game!": "Rozpocznij grę!",
          Done: "Gotowe",
          "This player": "Na gracza",
          "got votes from": "zagłosowali",
          "The End": "Koniec",
          "Back to home": "Powrót do strony głównej",
          or: "lub",
        },
      },
      en: {
        translation: {
          "This player": "Player",
        },
      },
    },
  });

export default i18n;
