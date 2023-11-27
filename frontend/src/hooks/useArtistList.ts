import { useCallback, useContext, useEffect } from "react";
import { ListContext } from "../contexts/ListContext";

type HookReturn = {
  artists: any[];
  artistsTotal: number;
  isLoading: boolean;
};

const useArtistList = (): HookReturn => {
  const { list, setList, pagination, listFilter, isLoading, setIsLoading } =
    useContext(ListContext);

  const fetchArtists = useCallback(async () => {
    try {
      setIsLoading(true);

      const { skip, take } = pagination;

      // @ts-ignore
      DZ.api(
        `/search/artist/?q=${listFilter}&index=${skip}&limit=${take}&output=xml`,
        function (response: any): void {
          if (response.data) {
            const formattedData = response.data.map((info: any) => ({
              id: info.id,
              name: info.name,
              imageUrl: info.picture_small,
            }));

            setList({
              data: formattedData,
              total: response.total,
            });
          } else {
            setList({
              data: [],
              total: 0,
            });
          }
        },
      );
    } catch (e) {
      alert("Ocorreu um erro ao buscar os artistas");
    } finally {
      setIsLoading(false);
    }
  }, [listFilter, pagination, setList, setIsLoading]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return {
    artists: list.data,
    artistsTotal: list.total,
    isLoading,
  };
};

export default useArtistList;
