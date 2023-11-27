import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthView } from "./pages/AuthView";
import { HomeView } from "./pages/HomeView";
import App from "./App";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="auth" element={<AuthView />} />
          <Route path="home" element={<HomeView />} />
          <Route index element={<AuthView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
