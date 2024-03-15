import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App.tsx";
import { Provider } from "react-redux";
import { store } from "./data/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Game } from "./containers/Game.tsx";
import "./utils/i18n.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
