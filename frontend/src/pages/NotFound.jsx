import { Link } from "react-router-dom";

// Friendly 404 page shown for any route the router does not match.
// Keeps the pet theme so the user stays in the experience and has a clear
// way back to the animals list.
export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-illustration" aria-hidden="true">
        <span className="not-found-paw">🐾</span>
      </div>

      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">This pup wandered off</h2>
      <p className="not-found-message">
        The page you are looking for does not exist or may have already found
        its forever home.
      </p>

      <Link to="/" className="btn btn-primary not-found-cta">
        Back to Home
      </Link>
    </main>
  );
}
