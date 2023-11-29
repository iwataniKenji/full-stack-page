import { useContext, useState } from "react";
import { ArtistsTable } from "./ArtistsTable";
import { ListContext } from "../contexts/ListContext";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export function MainSection() {
  const navigate = useNavigate();

  const { setListFilter, setPagination } = useContext(ListContext);

  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validationObject = Yup.object({
    inputText: Yup.string().required("Campo obrigatório"),
  });

  const handleSearch = async () => {
    try {
      await validationObject.validate({ inputText });

      setErrorMessage("");
      setPagination({ skip: 0, take: 10 });
      setListFilter(inputText);
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div
      style={{
        backgroundColor: "background.default",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
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
              }}
            >
              Olá, Usuário
            </p>
            <button
              style={{
                padding: "0.5rem 3rem",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>

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
                <p style={{ color: "red", margin: "0.5rem 0" }}>
                  {errorMessage}
                </p>
              )}
            </div>
            <button
              type="submit"
              style={{ padding: "0.5rem 3rem", cursor: "pointer" }}
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>

          <ArtistsTable />
        </div>
      </div>
    </div>
  );
}
