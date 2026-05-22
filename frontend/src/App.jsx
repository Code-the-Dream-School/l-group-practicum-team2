import { Route, Routes } from "react-router-dom";
import "./App.css";
import AnimalDetail from "./pages/AnimalDetail";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import NavigationBar from "./components/navbar/NavigationBar";
import Profile from "./pages/Profile";
import NotificationContainer from "./components/notifications/NotificationContainer";

function App() {
  return (
    <>
      <NavigationBar />
      <NotificationContainer />
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
