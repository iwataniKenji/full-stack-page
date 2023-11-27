import { ListContextProvider } from "./contexts/ListContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ListContextProvider>
      <Outlet />
    </ListContextProvider>
  );
}

export default App;
