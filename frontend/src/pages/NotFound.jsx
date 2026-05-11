import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <p>Animal not found.</p>
      <Link to="/" className="back-home-link">
        Go back to animals list
      </Link>
    </main>
  );
}
