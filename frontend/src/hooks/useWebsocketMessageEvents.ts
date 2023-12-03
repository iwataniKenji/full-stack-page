import { useEffect } from "react";

export function useWebsocketMessageEvents() {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    // quando aberto a conexão
    socket.addEventListener("open", (event) => {
      console.log("WebSocket conectado");
    });

    // quando novo artista é criado
    socket.addEventListener("message", (event) => {
      alert(`${event.data}`);
    });

    // quando ocorre um erro na conexão
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    // quando fechado a conexão
    socket.addEventListener("close", (event) => {
      console.log("WebSocket fechado:", event);
    });

    return () => {
      socket.close();
    };
  }, []);
}
