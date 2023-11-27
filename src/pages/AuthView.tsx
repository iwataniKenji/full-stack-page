import { useState } from "react";

export function AuthView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("email:", email);
    console.log("senha:", password);
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
        />

        <label>Senha:</label>
        <input
          placeholder="Digite sua senha"
          style={{ padding: "0.5rem", width: 300 }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            padding: "0.5rem 3rem",
            marginTop: "0.5rem",
            cursor: "pointer",
          }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
