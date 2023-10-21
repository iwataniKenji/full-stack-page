import { useCallback, useContext, useEffect } from "react";
import { ListContext } from "../contexts/ListContext";
import axios from "axios";

type HookReturn = {
  movies: any[];
  moviesTotal: number;
  isLoading: boolean;
  errorMessage?: string;
};

const useMovieList = (): HookReturn => {
  const { list, setList, listFilter, listStatus, setListStatus } =
    useContext(ListContext);

  const fetchMovies = useCallback(async () => {
    try {
      setListStatus({
        errorMessage: undefined,
        isLoading: true,
      });

      const movies = [] as any;

      console.log("env", process.env.REACT_APP_API_BASE_URL);

      const client = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        withCredentials: false,
      });

      const string = " ";

      const response = await client.get("", {
        params: {
          q: string,
        },
      });

      console.log("response", response);

      setList(movies);
    } catch (e) {
      // setListStatus((oldListStatus) => ({
      //   ...oldListStatus,
      //   errorMessage: axiosErrorToString(e),
      // }));
    } finally {
      // setListStatus((oldListStatus) => ({
      //   ...oldListStatus,
      //   isLoading: false,
      // }));
    }
  }, [listFilter, setList, setListStatus]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies: list.data,
    moviesTotal: list.total,
    errorMessage: listStatus.errorMessage,
    isLoading: listStatus.isLoading,
  };
};

export default useMovieList;
