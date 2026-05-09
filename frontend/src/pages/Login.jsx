import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/authService";


function Login() {
  const { loginUser, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  // TODO: integrate with backend auth validation for already-logged-in users.

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser({ email, password });

    if(success)
      navigate("/");
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
}

export default Login;
