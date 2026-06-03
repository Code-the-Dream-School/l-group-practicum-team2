import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthModal from "./components/auth/AuthModal";
import Footer from "./components/footer/Footer";
import NavigationBar from "./components/navbar/NavigationBar";
import NotificationContainer from "./components/notifications/NotificationContainer";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AnimalDetail from "./pages/AnimalDetail";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import Home from "./pages/Home";
import InquiriesPage from "./pages/InquiriesPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AppLoadingOverlay from "./components/loading/AppLoadingOverlay";

function App() {
  return (
    <>
      <AuthModal />
      <NotificationContainer />
      <AppLoadingOverlay />
      <div
        style={{
          maxWidth: "1320px",
          width: "100%",
          margin: "0 auto",
          padding: "0 1rem 1rem",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <NavigationBar />

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
        <Footer />
      </div>
    </>
  );
}

export default App;
