import { useMemo } from "react";
import useArtistList from "../hooks/useArtistList";

const tableHeadCellStyle = {
  backgroundColor: "#f2f2f2",
  padding: "8px",
  border: "1px solid #ddd",
};

const tableBodyCellStyle = {
  padding: "8px",
  border: "1px solid #ddd",
};

export function ArtistsTable() {
  const { artists, artistsTotal, isLoading } = useArtistList();

  const rows = useMemo(() => {
    if (!artists) {
      return (
        <tr>
          <td colSpan={2}>Lista vazia</td>
        </tr>
      );
    }

    return (
      <>
        {artists.map((artist) => (
          <tr key={artist.id}>
            <td style={tableBodyCellStyle}>{artist.id}</td>
            <td style={tableBodyCellStyle}>{artist.name}</td>
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
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      )}
    </div>
  );
}