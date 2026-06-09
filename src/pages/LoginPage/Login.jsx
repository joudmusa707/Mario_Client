import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      onLogin(data.user);
    } else {
      alert(data.message || "Login failed");
    }
  };
  return (
    <div className="signin-wrapper d-flex align-items-center justify-content-center p-3">
      {/* Back Button */}
      <Link to="/home" className="back-btn" aria-label="Go back">
        <i className="bi bi-arrow-left"></i>
      </Link>

      {/* Glassmorphic Form Container */}
      <div className="glass-card p-4 p-sm-5 text-center">
        <h1 className="form-title mb-2">Welcome Back</h1>
        <p className="form-subtitle mb-4">Sign in to continue your adventure</p>

        <form onSubmit={(e) => handleLogin(e)}>
          {/* Email Address Field */}
          <div className="mb-3 text-start">
            <label className="form-label text-light small opacity-75 fw-semibold mb-2">
              Email Address
            </label>
            <div className="input-group-custom">
              <span className="input-icon">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control-custom"
                placeholder="mario@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4 text-start">
            <label className="form-label text-light small opacity-75 fw-semibold mb-2">
              Password
            </label>
            <div className="input-group-custom">
              <span className="input-icon">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control-custom"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-100 btn-submit py-2.5 mb-4 fw-semibold"
          >
            Sign In
          </button>

          {/* Footer Link */}
          <div className="footer-text text-light opacity-75 small">
            Don't have an account?{" "}
            <Link
              to="/SignUp"
              className="text-decoration-none text-accent ms-1 fw-semibold"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
