import "dotenv/config";
import express from "express";
import http from "http";
import WebSocket from "ws";
import authRoutes from "./routes/authRoutes";
import artistRoutes from "./routes/artistRoutes";
import cors from "cors";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { createClient } from "redis";
import { cacheRoute } from "./services/redisService";
import { sendMessageToRabbitMQ } from "./services/rabitMQService";

const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

export const connectedClients = new Set<WebSocket>();
export const redisClient = createClient();

app.use(
  cors({
    origin: frontendUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Authorization, Content-Type, Accept",
  }),
);

app.use(express.json());
app.use("/auth", cacheRoute, authRoutes);
app.use("/artist", ensureAuthenticated, cacheRoute, artistRoutes);

// conexão com websocket
webSocketServer.on("connection", (ws: WebSocket) => {
  console.log("webSocket conectado");
  connectedClients.add(ws);

  ws.on("message", (message: string): void => {
    sendMessageToRabbitMQ(message).then(() => {
      ws.send("Mensagem recebida pelo servidor");
    });
  });

  ws.on("close", () => {
    console.log("webSocket desconectado");
    connectedClients.delete(ws);
  });
});

// conexão com redis
redisClient.on("error", (err) => console.log("Redis client error", err));
redisClient.connect().then(() => console.log("Redis client conectado"));

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
