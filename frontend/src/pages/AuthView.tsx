import { useState } from "react";
import useDoLogin from "../hooks/useDoLogin";

export function AuthView() {
  const doLogin = useDoLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const formData = { email, password };

    doLogin(formData, setIsLoading);
  };

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
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label>Email:</label>

        <input
          placeholder="Digite seu email"
          style={{ padding: "0.5rem", width: 300 }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <label>Senha:</label>
        <input
          placeholder="Digite sua senha"
          style={{ padding: "0.5rem", width: 300 }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <button
          style={{
            padding: "0.5rem 3rem",
            marginTop: "0.5rem",
            cursor: "pointer",
          }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          Login
        </button>
      </div>
    </div>
  );
}
