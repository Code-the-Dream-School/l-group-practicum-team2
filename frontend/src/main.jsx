import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { SpecialNeedProvider } from "./services/SpecialNeedContext";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SpecialNeedProvider>
          <App />
        </SpecialNeedProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
