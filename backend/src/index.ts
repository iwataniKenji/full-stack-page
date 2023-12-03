import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/authRoutes";
import artistRoutes from "./routes/artistRoutes";
import cors from "cors";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { createClient } from "redis";

const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();
const redisClient = createClient();

export function cacheRoute(req: Request, res: Response, next: NextFunction) {
  const key = req.originalUrl;

  redisClient
    .get(key)
    .then((cachedResponse) => {
      if (cachedResponse) {
        console.log("cachedResponse", cachedResponse);

        res.send(JSON.parse(cachedResponse)); // retorna valor em cache
      } else {
        next(); // continua execução da rota
      }
    })
    .catch((err) => {
      console.error("Erro ao acessar o cache do Redis:", err);
      res.status(500).send("Erro interno no servidor do Redis");
    });
}

export function storeCache(key: string, value: string): void {
  const seconds = 60; // 1 minuto

  // armazena valor em cache
  redisClient.setEx(key, seconds, value).then((r) => console.log(r));
}

export function invalidateCache(key: string): void {
  redisClient.del(key).then((r) => console.log("Cache invalidado", r));
}

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

redisClient.on("error", (err) => console.log("Redis client error", err));
redisClient.connect().then(() => console.log("Redis client conectado"));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
