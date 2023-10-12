import { MoviesTable } from "./MoviesTable";
import { useContext } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ListContext } from "../contexts/ListContext";

export function MainPage() {
  const { listFilter, setListFilter } = useContext(ListContext);

  const handleSearch = () => {
    console.log("listFilter", listFilter); // TODO -> implementar
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            mt: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontSize: 32, width: "100%" }}>
              Procure por um filme
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              label="Nome do filme"
              placeholder={"Ex: Oppenheimer"}
              variant="outlined"
              size="small"
              value={listFilter}
              onChange={(e) => setListFilter(e.target.value)}
            />
            <Button
              sx={{ px: 6, py: 1 }}
              variant="contained"
              color="warning"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Box>
          <MoviesTable />
        </Box>
      </Container>
    </Box>
  );
}
