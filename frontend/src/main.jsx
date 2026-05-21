import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AnimalProvider } from "./contexts/AnimalContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AnimalProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </AnimalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
