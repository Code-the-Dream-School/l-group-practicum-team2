import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimalDetailPage from "./components/AnimalDetailPage";

function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Animal App</h1>
      <p>Open animal details by URL: /animals/:id</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/animals/:id" element={<AnimalDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
