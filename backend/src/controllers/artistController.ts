import { Request, Response } from "express";
import { createArtistData, getArtistsData } from "../services/firebaseService";
import { invalidateCache, storeCache } from "../services/redisService";

export const getArtists = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { listFilter } = req.query as any;

  try {
    const artists = await getArtistsData(listFilter);

    storeCache(req.originalUrl, JSON.stringify(artists));

    res.json(artists);
  } catch (e) {
    console.error("Erro ao obter listagem de artistas:", e);
    res.status(500).json({ message: "Erro ao obter listagem de artistas" });
  }
};

export const createArtist = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, genre } = req.body as { name: string; genre: string };

  try {
    if (!name || !genre) {
      res.status(400).json({ message: "Dados incompletos" });

      return;
    }

    const newArtist = await createArtistData(name, genre);

    invalidateCache(req.originalUrl);

    res.json(newArtist);
  } catch (error) {
    console.error("Erro ao criar artista:", error);
    res.status(500).json({ message: "Erro ao criar artista" });
  }
};
