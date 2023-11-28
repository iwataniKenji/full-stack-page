import { Request, Response } from "express";
import { authenticateUser } from "../services/firebaseService";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "secret";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  try {
    const isAuthenticated = await authenticateUser(username, password);

    if (isAuthenticated) {
      const token = jwt.sign({ username }, secretKey, {
        expiresIn: "1h",
      });

      res.json({ token });
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (e) {
    console.error("Erro na autenticação:", e);
    res.status(500).json({ message: "Erro na autenticação" });
  }
};
