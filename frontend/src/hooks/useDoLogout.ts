import { useNavigate } from "react-router-dom";
import api from "../services/api";

type HookReturn = () => void;

const useDoLogout = (): HookReturn => {
  const navigate = useNavigate();

  return async () => {
    try {
      await api.logout();
    } catch (e) {
      // do nothing
    }

    sessionStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };
};

export default useDoLogout;
