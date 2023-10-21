import { useCallback, useContext, useEffect } from "react";
import { ListContext } from "../contexts/ListContext";

type HookReturn = {
  artists: any[];
  artistsTotal: number;
  isLoading: boolean;
};

const useArtistList = (): HookReturn => {
  const { list, setList, listFilter, isLoading, setIsLoading } =
    useContext(ListContext);

  const fetchArtists = useCallback(async () => {
    try {
      setIsLoading(true);

      // @ts-ignore
      DZ.api(
        `/search/artist/?q=${listFilter}&index=0&limit=10&output=xml`,
        function (response: any) {
          if (response.data) {
            const formattedData = response.data.map((info: any) => ({
              id: info.id,
              name: info.name,
            }));

            setList({
              data: formattedData,
              total: formattedData.length,
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
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [listFilter, setList, setIsLoading]);

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
