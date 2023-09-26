import { MainPage } from "./components/MainPage";
import { ListContextProvider } from "./contexts/ListContext";

function App() {
  return (
    <ListContextProvider>
      <MainPage />
    </ListContextProvider>
  );
}

export default App;
