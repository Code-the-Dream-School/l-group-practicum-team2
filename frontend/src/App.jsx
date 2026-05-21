import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavigationBar from "./components/navbar/NavigationBar";
import AnimalDetail from "./pages/AnimalDetail";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import Home from "./pages/Home";
import InquiriesPage from "./pages/InquiriesPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
<<<<<<< HEAD
import NotificationContainer from "./components/notifications/NotificationContainer";
=======
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AuthModal from "./components/auth/AuthModal";
>>>>>>> 8222494c (move login/signup modal logic into AuthModal component)

function App() {

  return (
    <>
      <AuthModal />
      <NavigationBar />
      <NotificationContainer />
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
<<<<<<< HEAD
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

=======
>>>>>>> 8222494c (move login/signup modal logic into AuthModal component)
          <Route path="*" element={<NotFound />} />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
        </Routes>
      </div>
    </>
  );
}

export default App;
