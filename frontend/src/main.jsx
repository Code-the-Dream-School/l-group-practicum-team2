import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { SpecialNeedProvider } from "./services/SpecialNeedContext";
import { AnimalProvider } from "./contexts/AnimalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AnimalProvider>
        <SpecialNeedProvider>
          <App />
        </SpecialNeedProvider>
      </AnimalProvider>
    </BrowserRouter>
  </StrictMode>
);
