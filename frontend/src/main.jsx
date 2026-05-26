import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AnimalProvider } from "./contexts/AnimalContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";
import { FavoriteProvider } from "./contexts/FavoriteContext.jsx";
import { InquiryProvider } from "./contexts/InquiryContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AnimalProvider>
          <FavoriteProvider>
            <InquiryProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </InquiryProvider>
          </FavoriteProvider>
        </AnimalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
