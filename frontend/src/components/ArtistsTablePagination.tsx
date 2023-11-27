import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";

export function ArtistsTablePagination() {
  const { list, pagination, setPagination } = useContext(ListContext);
  const { take, skip } = pagination;

  const currentPage = Math.floor(skip / take) + 1;
  const totalPages = Math.ceil(list.total / take);

  const prevButtonIsDisabled = currentPage === 1;
  const nextButtonIsDisabled = currentPage === totalPages;

  const handlePageChange = (pageNumber: number) => {
    const newSkip = (pageNumber - 1) * take;

    setPagination({ ...pagination, skip: newSkip });
  };

  return (
    <div
      style={{
        padding: "1rem 0",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <p>
        Página {currentPage} de {totalPages}
      </p>
      <button
        style={{
          padding: "0.5rem 3rem",
          cursor: prevButtonIsDisabled ? "not-allowed" : "pointer",
        }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={prevButtonIsDisabled}
      >
        Anterior
      </button>
      <button
        style={{
          padding: "0.5rem 3rem",
          cursor: nextButtonIsDisabled ? "not-allowed" : "pointer",
        }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={nextButtonIsDisabled}
      >
        Próxima
      </button>
    </div>
  );
}
