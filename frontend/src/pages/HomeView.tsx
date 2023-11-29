import { MainSection } from "../components/MainSection";

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
      >
        <p>Usuário não autenticado</p>
      </div>
    );
  }

  return <MainSection />;
}
