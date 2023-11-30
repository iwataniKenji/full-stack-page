import { useContext, useState } from "react";
import useCreateProduct from "../hooks/useCreateArtist";
import { ListContext } from "../contexts/ListContext";

export function CreateUserSection() {
  const createArtist = useCreateProduct();

  const { isLoading } = useContext(ListContext);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");

  const handleCreate = () => {
    createArtist({ name, genre });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "end",
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
        Crie um novo artista:
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          gap: "0.25rem",
        }}
      >
        <label>Nome:</label>

        <input
          placeholder="Digite o nome do artista"
          style={{ padding: "0.5rem", width: 200 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          gap: "0.25rem",
        }}
      >
        <label>Gênero musical</label>
        <input
          placeholder="Digite o gênero musical"
          style={{ padding: "0.5rem", width: 200 }}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        style={{
          padding: "0.5rem 3rem",
          cursor: "pointer",
        }}
        onClick={handleCreate}
        disabled={isLoading}
      >
        Criar Artista
      </button>
    </div>
  );
}
