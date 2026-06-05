import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { handleLogin, error, loading } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });

    if (success) {
      window.location.href = from;
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Login</h1>
      <title>Login - PawMatch</title>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email</label>
          <br />
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="login-password">Password</label>
          <br />
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>

      {loading && <LoadingSpinner message="Submitting details..." />}
      {error && <ErrorMessage message={error} />}
    </main>
  );
}

export default Login;
