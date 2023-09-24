import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    maxWidth: 100,
    editable: false,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Movie",
    maxWidth: 100,
    editable: false,
    sortable: false,
  },
];

const rows = [
  { id: 1, name: "Movie #1" },
  { id: 2, name: "Movie #2" },
];

export function MoviesTable() {
  return (
    <Box sx={{ height: 520, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        disableColumnFilter
        disableColumnMenu
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
