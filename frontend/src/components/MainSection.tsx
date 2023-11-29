import { ArtistsTable } from "./ArtistsTable";
import { CreateUserSection } from "./CreateUserSection";
import { LogoutSection } from "./LogoutSection";
import { SearchbarSection } from "./SearchbarSection";

export function MainSection() {
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
