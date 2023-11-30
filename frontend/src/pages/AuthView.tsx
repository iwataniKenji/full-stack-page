import { AuthSection } from "../module-components/AuthSection";

export function AuthView() {
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
    >
      <AuthSection />
    </div>
  );
}
