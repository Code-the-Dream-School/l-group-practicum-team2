import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <title>Not Found - PawMatch</title>
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
