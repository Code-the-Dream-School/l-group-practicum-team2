import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import { SpecialNeedProvider } from './context/SpecialNeedContext'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SpecialNeedProvider>
      <App />
    </SpecialNeedProvider>
  </StrictMode>
);
