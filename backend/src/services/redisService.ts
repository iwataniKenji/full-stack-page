import { NextFunction, Request, Response } from "express";
import { redisClient } from "../index";

export function cacheRoute(req: Request, res: Response, next: NextFunction) {
  const key = req.originalUrl;

  redisClient
    .get(key)
    .then((cachedResponse) => {
      if (cachedResponse) {
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
