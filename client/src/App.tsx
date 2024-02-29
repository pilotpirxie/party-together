import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SockJS from "sockjs-client";
import Stompp from "stompjs";

function App() {
  const [count, setCount] = useState(0)
  const [sock] = useState<WebSocket>(new SockJS("http://localhost:8080/ws"));
  const [stompClient, setStompClient] = useState<Stompp.Client | null>(null);

  useEffect(() => {
    const stompClient = Stompp.over(sock);
    stompClient.connect({}, () => {
      console.log("connected");
      setStompClient(stompClient);
    });
  }, [sock]);

  useEffect(() => {
    stompClient?.send("/app/hello", {}, JSON.stringify({ name: "John" }));
  }, [stompClient]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
