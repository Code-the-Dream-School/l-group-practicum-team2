import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Footer from "./components/footer/Footer";
import NavigationBar from "./components/navbar/NavigationBar";
import AnimalDetail from "./pages/AnimalDetail";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import Home from "./pages/Home";
import InquiriesPage from "./pages/InquiriesPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import NotificationContainer from "./components/notifications/NotificationContainer";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavigationBar />
      <NotificationContainer />
      <div
        style={{
          maxWidth: "1320px",
          width: "100%",
          margin: "0 auto",
          padding: "1rem",
          flexGrow: 1,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/profile/inquiries"
            element={
              <ProtectedRoute>
                <InquiriesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inquiries"
            element={
              <ProtectedRoute>
                <InquiriesPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
