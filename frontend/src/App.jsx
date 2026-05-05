import { Route, Routes } from "react-router-dom";
import AnimalList from "./pages/animals/AnimalList";
import AnimalDetail from "./pages/animals/AnimalDetail";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AnimalList />} />
      <Route path="/animals/:id" element={<AnimalDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
