import { useCallback, useContext, useEffect } from "react";
import api from "../services/api";
import { ListContext } from "../contexts/ListContext";
import { ListProps } from "../types/ListProps";

type HookReturn = {
  artists: ListProps;
  isLoading: boolean;
};

const useArtistList = (): HookReturn => {
  const { list, setList, isLoading, setIsLoading } = useContext(ListContext);

  const fetchArtists = useCallback(async () => {
    try {
      setIsLoading(true);

      const artists = await api.findAllArtists();

      setList({
        data: artists,
        total: artists.length,
      });
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
