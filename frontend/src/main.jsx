import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SpecialNeedProvider } from "./services/SpecialNeedContext";
import { AnimalProvider } from "./contexts/AnimalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AnimalProvider>
          <SpecialNeedProvider>
            <App />
          </SpecialNeedProvider>
        </AnimalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
