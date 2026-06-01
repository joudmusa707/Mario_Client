import "./SignUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = ({ onSignUp }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname,
      email,
      password,
    };
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data && data.user) onSignUp(data.user);
    } catch (err) {
      alert(err.response.data.message || "An error occurred during sign up.");
    }
  };

  return (
    <div className="signup-wrapper d-flex align-items-center justify-content-center p-3">
      {/* Back Button */}
      <button
        className="back-btn"
        aria-label="Go back"
        onClick={() => window.history.back()}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      {/* Glassmorphic Form Container */}
      <div className="glass-card p-4 p-sm-5 text-center">
        <h1 className="form-title mb-2">Create Account</h1>
        <p className="form-subtitle mb-4">Start your gaming adventure today</p>

        <form onSubmit={(e) => submitHandler(e)}>
          {/* Full Name Field */}
          <div className="mb-3 text-start">
            <label className="form-label text-light small opacity-75 fw-semibold mb-2">
              Full Name
            </label>
            <div className="input-group-custom">
              <span className="input-icon">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className="form-control-custom"
                placeholder="Mario"
                required
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>

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
            Create Account
          </button>

          {/* Footer Link */}
          <div className="footer-text text-light opacity-75 small">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-decoration-none text-accent ms-1 fw-semibold"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
