import { useMemo } from "react";
import { ArtistsTablePagination } from "./ArtistsTablePagination";
import useArtistList from "../hooks/useArtistList";

const tableHeadCellStyle = {
  backgroundColor: "#f2f2f2",
  padding: "1rem",
  border: "1px solid #ddd",
};

const tableBodyCellStyle = {
  padding: "1rem",
  width: "50%",
  border: "1px solid #ddd",
};

export function ArtistsTable() {
  const { artists, isLoading } = useArtistList();

  const rows = useMemo(() => {
    if (artists.length === 0) {
      return (
        <tr>
          <td style={tableBodyCellStyle} colSpan={3}>
            Lista vazia
          </td>
        </tr>
      );
    }

    return (
      <>
        {artists.map((artist) => (
          <tr key={artist.id}>
            <td style={tableBodyCellStyle}>{artist.id}</td>
            <td style={tableBodyCellStyle}>{artist.name}</td>
            <td style={{ ...tableBodyCellStyle, padding: "0.25rem" }}>
              <img src={artist.imageUrl} alt={artist.name} />
            </td>
          </tr>
        ))}
      </>
    );
  }, [artists]);

  return (
    <div style={{ height: 520, width: "100%" }}>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeadCellStyle}>Id</th>
                <th style={tableHeadCellStyle}>Artista</th>
                <th style={tableHeadCellStyle}>Img</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          <ArtistsTablePagination />
        </div>
      )}
    </div>
  );
}
