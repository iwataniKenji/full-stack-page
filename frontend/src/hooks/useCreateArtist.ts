import { CreateArtistFormData } from "../types/CreateArtistFormData";
import api from "../services/api";

type HookReturn = (
  formData: CreateArtistFormData,
  setIsLoading: (value: boolean) => void,
) => void;

const useCreateProduct = (): HookReturn => {
  return async (
    formData: CreateArtistFormData,
    setIsLoading: (value: boolean) => void,
  ): Promise<void> => {
    try {
      setIsLoading(true);

      if (formData.name === "" || formData.genre === "") {
        alert("Preencha todos os campos");

        return;
      }

      await api.createArtist(formData);
    } catch (error: any) {
      console.log("error", error);

      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
};

export default useCreateProduct;
