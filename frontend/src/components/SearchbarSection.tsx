import { useContext, useState } from "react";
import { ListContext } from "../contexts/ListContext";
import * as Yup from "yup";

export function SearchbarSection() {
  const { setListFilter, isLoading } = useContext(ListContext);

  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validationObject = Yup.object({
    inputText: Yup.string().required("Campo obrigatório"),
  });

  const handleSearch = async () => {
    try {
      await validationObject.validate({ inputText });

      setErrorMessage("");
      setListFilter(inputText);
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "start",
        gap: "1rem",
      }}
    >
      <p
        style={{
          margin: "0.2rem 0",
          fontSize: 24,
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        Procure por um artista:
      </p>
      <div>
        <input
          style={{ padding: "0.5rem", width: 300 }}
          placeholder="Digite o nome do artista"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {errorMessage && (
          <p style={{ color: "red", margin: "0.5rem 0" }}>{errorMessage}</p>
        )}
      </div>
      <button
        type="submit"
        style={{ padding: "0.5rem 3rem", cursor: "pointer" }}
        onClick={handleSearch}
        disabled={isLoading}
      >
        Buscar
      </button>
    </div>
  );
}
