import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./data/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Game } from "./containers/Game.tsx";
import "./utils/i18n.ts";
import { Join } from "./containers/Join.tsx";
import { NewGame } from "./containers/NewGame.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Join />,
  },
  {
    path: "/new",
    element: <NewGame />,
  },
  {
    path: "/game/:code",
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
