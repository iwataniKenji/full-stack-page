import { Request, Response } from "express";
import { createArtistData, getArtistsData } from "../services/firebaseService";

export const getArtists = async (req: Request, res: Response) => {
  try {
    const artists = await getArtistsData();

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
    await createArtistData(name, genre);

    res.status(201).json({ message: "Artista criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar artista:", error);
    res.status(500).json({ message: "Erro ao criar artista" });
  }
};
