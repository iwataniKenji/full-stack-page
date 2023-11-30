import { useCallback, useEffect, useState } from "react";
import { Artist } from "../types/Artist";
import api from "../services/api";

type HookReturn = {
  artists: any[];
  isLoading: boolean;
};

const useArtistList = (): HookReturn => {
  const [list, setList] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArtists = useCallback(async () => {
    try {
      setIsLoading(true);

      const artists = await api.findAllArtists();

      setList(artists);
    } catch (error) {
      console.log("error", error);

      alert("Ocorreu um erro ao buscar os artistas");
    } finally {
      setIsLoading(false);
    }
  }, [setList, setIsLoading]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return {
    artists: list,
    isLoading: isLoading,
  };
};

export default useArtistList;
