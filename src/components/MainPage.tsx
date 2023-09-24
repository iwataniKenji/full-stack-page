import { Box, Container, Typography } from "@mui/material";
import { MoviesTable } from "./MoviesTable";

export function MainPage() {
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
            alignItems: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Typography sx={{ fontSize: 36 }}>
            Top 250 Movies From IMDB
          </Typography>
          <MoviesTable />
        </Box>
      </Container>
    </Box>
  );
}
