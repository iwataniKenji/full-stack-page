import { Request, Response } from "express";
import { getArtistsData } from "../services/firebaseService";

export const getArtists = async (req: Request, res: Response) => {
  try {
    const artists = await getArtistsData();

    res.json({ artists });
  } catch (e) {
    console.error("Erro ao obter listagem de artistas:", e);
    res.status(500).json({ message: "Erro ao obter listagem de artistas" });
  }
};
