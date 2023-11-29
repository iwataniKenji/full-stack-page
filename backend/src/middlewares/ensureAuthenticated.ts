import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "secret";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["Authorization"] as string;

  if (!token) {
    return res.status(403).json({ message: "Token não encontrado" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    (req as any).user = decoded;
    next();
  });
}
