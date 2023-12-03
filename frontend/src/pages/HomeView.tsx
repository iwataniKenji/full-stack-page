import { CreateUserSection } from "../module-components/CreateUserSection";
import { SearchbarSection } from "../module-components/SearchbarSection";
import { ArtistsTable } from "../module-components/ArtistsTable";
import { useNavigate } from "react-router-dom";

export function HomeView() {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };

  if (!authToken) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    );
  }

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
          <CreateUserSection />
          <SearchbarSection />
          <ArtistsTable />
        </div>
      </div>
    </div>
  );
}
