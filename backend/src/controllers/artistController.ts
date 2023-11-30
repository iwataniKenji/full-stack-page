import { Request, Response } from "express";
import { createArtistData, getArtistsData } from "../services/firebaseService";

export const getArtists = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { listFilter } = req.query as any;

  try {
    const artists = await getArtistsData(listFilter);

    res.json({ artists });
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
    const newArtist = await createArtistData(name, genre);

    res.json({ artist: newArtist });
  } catch (error) {
    console.error("Erro ao criar artista:", error);
    res.status(500).json({ message: "Erro ao criar artista" });
  }
};
