import React from "react";
import "./LevelSelection.css"; // Importing the external CSS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const LevelSelection = ({ user, handleLogout }) => {
  const [levels, setLevels] = React.useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/levels")
      .then((response) => response.json())
      .then((data) => setLevels(data))
      .catch((error) => console.error("Error fetching levels:", error));
  }, []);
  0;
  return (
    <div className="game-bg min-vh-100 text-white py-4 px-3 px-md-5">
      <div className="container-fluid max-width-container">
        {/* Header Actions */}
        <div className="d-flex flex-col flex-sm-row justify-content-between align-items-center mb-4 gap-3">
          <h1 className="fw-bold m-0 logo-text">Select Level</h1>
          <div className="d-flex gap-2">
            <Link
              to="/leaderboard"
              className="btn btn-outline-light btn-custom px-3 py-2"
            >
              <i className="bi bi-trophy me-2"></i>Leaderboard
            </Link>
            <Link
              to="/profile"
              className="btn btn-outline-light btn-custom px-3 py-2"
            >
              <i className="bi bi-person me-2"></i>Profile
            </Link>
            <Link to="/">
              <button
                className="btn btn-danger btn-logout px-3 py-2 fw-semibold"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </Link>
          </div>
        </div>

        {/* User Status Bar */}
        <div className="user-status-card d-flex justify-content-between align-items-center p-3 mb-4 rounded-4">
          <div className="d-flex align-items-center gap-3">
            <div className="avatar-box d-flex align-items-center justify-content-center fw-bold fs-4">
              J
            </div>
            <div>
              <h5 className="m-0 fw-bold tracking-wide">{user.fullname}</h5>
              <small className="text-secondary-white">
                Current Level: {user.level}
              </small>
            </div>
          </div>
          <div className="coin-badge d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-bold">
            <span className="coin-icon">
              <i className="bi bi-coin text-white"></i>
            </span>
            <span className="coin-amount">{user.coincollected}</span>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="row g-4">
          {levels.map((level) => (
            <Link
              to={!level.locked ? `/Game/${level.id}` : "#"}
              key={level.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 linkToLevelGame"
            >
              <div key={level.id}>
                <div
                  className={`level-card p-4 rounded-4 text-center h-100 d-flex flex-column justify-content-between ${level.locked ? "card-locked" : "card-active"}`}
                >
                  {/* Level Number Badging */}
                  <div className="d-flex justify-content-center mb-3 position-relative">
                    <div
                      className={`level-number ${level.colorclass} d-flex align-items-center justify-content-center fw-bold fs-3 shadow`}
                    >
                      {level.id}
                    </div>
                    {level.locked && (
                      <div className="lock-overlay d-flex align-items-center justify-content-center">
                        <i className="bi bi-lock-fill fs-2"></i>
                      </div>
                    )}
                  </div>

                  {/* Level Meta */}
                  <div className="mb-3">
                    <h5
                      className={`m-0 fw-bold ${level.locked ? "text-muted-custom" : "text-white"}`}
                    >
                      {level.name}
                    </h5>
                    <span className="text-muted-sm d-block mt-1">
                      {level.difficulty}
                    </span>
                  </div>

                  {/* Reward Footer */}
                  <div className="star-badge py-2 px-3 rounded-3 mt-auto d-flex align-items-center justify-content-center gap-1">
                    <span className="star-icon">⭐</span> {level.stars}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;
