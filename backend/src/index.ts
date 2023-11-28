import express from "express";
import authRoutes from "./routes/authRoutes";
import artistRoutes from "./routes/artistRoutes";
import cors from "cors";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: frontendUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Authorization, Content-Type, Accept",
  }),
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/artist", ensureAuthenticated, artistRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
