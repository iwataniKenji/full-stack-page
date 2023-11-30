import { CreateArtistFormData } from "../types/CreateArtistFormData";
import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";
import api from "../services/api";

type HookReturn = (
  formData: CreateArtistFormData,
  setName: (value: string) => void,
  setGenre: (value: string) => void,
) => void;

const useCreateProduct = (): HookReturn => {
  const { list, setList, setIsLoading } = useContext(ListContext);

  return async (
    formData: CreateArtistFormData,
    setName: (value: string) => void,
    setGenre: (value: string) => void,
  ): Promise<void> => {
    try {
      setIsLoading(true);

      if (formData.name === "" || formData.genre === "") {
        alert("Preencha todos os campos");

        return;
      }

      const newArtist = await api.createArtist(formData);

      setList({
        data: [...list.data, newArtist],
        total: list.total + 1,
      });

      setName("");
      setGenre("");
    } catch (error: any) {
      console.log("error", error);

      alert("Ocorreu um erro ao criar o artista");
    } finally {
      setIsLoading(false);
    }
  };
};

export default useCreateProduct;
