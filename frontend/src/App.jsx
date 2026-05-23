import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navbar/NavigationBar";
import AnimalDetail from "./pages/AnimalDetail";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import Home from "./pages/Home";
import InquiriesPage from "./pages/InquiriesPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import NotificationContainer from "./components/notifications/NotificationContainer";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AuthModal from "./components/auth/AuthModal";

function App() {
  return (
    <>
      <AuthModal />
      <NavigationBar />
      <NotificationContainer />
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />

          <Route
            path="/profile/inquiries"
            element={
              <ProtectedRoute>
                <InquiriesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
