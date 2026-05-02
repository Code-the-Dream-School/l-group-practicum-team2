import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

function Home() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call the backend API
    fetch("http://localhost:3000/api/hello")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch from backend");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Frontend ↔ Backend Test</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <p>
          Message from API: <strong>{message}</strong>
        </p>
      )}
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
