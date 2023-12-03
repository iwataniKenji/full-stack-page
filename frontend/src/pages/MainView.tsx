import { CreateUserSection } from "../module-components/CreateUserSection";
import { SearchbarSection } from "../module-components/SearchbarSection";
import { ArtistsTable } from "../module-components/ArtistsTable";
import { useNavigate } from "react-router-dom";
import { useWebsocketMessageEvents } from "../hooks/useWebsocketMessageEvents";

export function MainView() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };

  useWebsocketMessageEvents();

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
