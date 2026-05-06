import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnimalList from "./pages/animals/AnimalList";
import "./App.css";
import FavoritesPage from "./pages/favorites/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="app-nav">
        <h2>PawMatch</h2>
        <Link to="/favorites" className="favorites-link">Favorites</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AnimalList />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
  
}
export default App;
