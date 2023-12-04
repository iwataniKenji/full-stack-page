import { Request, Response } from "express";
import { authenticateUser } from "../services/firebaseService";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Dados incompletos" });

      return;
    }

    const isAuthenticated = await authenticateUser(email, password);

    if (isAuthenticated) {
      const token = jwt.sign({ email }, SECRET_KEY, {
        expiresIn: "10m",
      });

      res.json(token);
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (e) {
    console.error("Erro na autenticação:", e);
    res.status(500).json({ message: "Erro na autenticação" });
  }
};
