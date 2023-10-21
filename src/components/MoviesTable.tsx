import useMovieList from "../hooks/useMovieList";

const rows = [
  { id: 1, name: "Movie #1" },
  { id: 2, name: "Movie #2" },
];

export function MoviesTable() {
  const { movies, moviesTotal } = useMovieList();

  return (
    <div style={{ height: 520, width: "100%" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Movie</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
