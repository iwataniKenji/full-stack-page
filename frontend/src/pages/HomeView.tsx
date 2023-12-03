import { CreateUserSection } from "../module-components/CreateUserSection";
import { SearchbarSection } from "../module-components/SearchbarSection";
import { ArtistsTable } from "../module-components/ArtistsTable";
import { LogoutSection } from "../module-components/LogoutSection";

export function HomeView() {
  const authToken = sessionStorage.getItem("token");

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
          <LogoutSection />
          <CreateUserSection />
          <SearchbarSection />
          <ArtistsTable />
        </div>
      </div>
    </div>
  );
}
