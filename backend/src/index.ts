import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes";
import artistRoutes from "./routes/artistRoutes";
import cors from "cors";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { createClient } from "redis";
import { cacheRoute } from "./services/redisService";

const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();
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

redisClient.on("error", (err) => console.log("Redis client error", err));
redisClient.connect().then(() => console.log("Redis client conectado"));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
