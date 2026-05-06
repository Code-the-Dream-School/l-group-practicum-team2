import { Routes, Route } from "react-router-dom";
import AnimalList from "./pages/animals/AnimalList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AnimalList />} />
      <Route path="/animals" element={<AnimalList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
