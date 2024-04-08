export const BASE_HOST_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin
    : "http://localhost:8080";

const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";

export const BASE_WS_URL =
  process.env.NODE_ENV === "production"
    ? protocol + window.location.host + "/ws"
    : "ws://localhost:8080/ws";
