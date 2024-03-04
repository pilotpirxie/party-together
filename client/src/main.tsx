import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/App/App.tsx'
import {Provider} from "react-redux";
import {store} from "./data/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
