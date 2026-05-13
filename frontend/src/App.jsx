import { Route, Routes } from "react-router-dom";
import "./App.css";
import AnimalDetail from "./pages/AnimalDetail";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import NavigationBar from "./components/navbar/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
