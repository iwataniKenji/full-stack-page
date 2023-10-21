import { ArtistsTable } from "./ArtistsTable";
import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";

export function MainPage() {
  const { listFilter, setListFilter } = useContext(ListContext);

  const handleSearch = () => {
    console.log("listFilter", listFilter); // TODO -> implementar
  };

  return (
    <div
      style={{
        backgroundColor: "background.default",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <p style={{ fontSize: 32, width: "100%" }}>Procure por um filme</p>
            <input
              style={{ width: "100%", padding: "0.5rem" }}
              placeholder="Digite o nome do filme"
              value={listFilter}
              onChange={(e) => setListFilter(e.target.value)}
            />
            <button
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
