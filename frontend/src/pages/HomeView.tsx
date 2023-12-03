import { MainView } from "./MainView";

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

  return <MainView />;
}
