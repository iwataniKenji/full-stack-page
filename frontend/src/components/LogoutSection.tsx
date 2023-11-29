import { useNavigate } from "react-router-dom";

export function LogoutSection() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/auth");
  };

  return (
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
  );
}
