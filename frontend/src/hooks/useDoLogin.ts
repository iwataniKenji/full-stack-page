import { useNavigate } from "react-router-dom";
import { AuthFormData } from "../types/AuthFormData";
import api from "../services/api";

type HookReturn = (
  authFormData: AuthFormData,
  setIsLoading: (value: boolean) => void,
) => void;

const useDoLogin = (): HookReturn => {
  const navigate = useNavigate();

  return async (
    authFormData: AuthFormData,
    setIsLoading: (value: boolean) => void,
  ): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await api.auth(authFormData);

      sessionStorage.setItem("token", response);

      navigate("/home", { replace: true });
    } catch (error: any) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
};

export default useDoLogin;
