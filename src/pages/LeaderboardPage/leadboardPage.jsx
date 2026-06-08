import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./leaderboardPage.css";
const leaderboardPage = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => b.coincollected - a.coincollected,
        );
        setPlayers(sortedData);
      })
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  return (
    <div className="game-bg min-vh-100 text-white py-4 px-3 px-md-5 d-flex flex-column align-items-center">
      <div className="container-fluid max-width-container position-relative">
        {/* Header Section */}
        <div className="d-flex justify-content-center align-items-center mb-4 position-relative w-100 header-wrapper">
          <Link to="/LevelSelection">
            <button className="btn btn-outline-light back-arrow-btn position-absolute start-0">
              <i className="bi bi-arrow-left"></i>
            </button>
          </Link>
          <h1 className="fw-bold m-0 logo-text d-flex align-items-center gap-2">
            <i className="bi bi-trophy-fill text-warning"></i> Leaderboard
          </h1>
        </div>

        {/* Conditional Content Rendering */}
        {players.length === 0 ? (
          /* Empty State View */
          <div className="d-flex flex-column align-items-center w-100">
            <div className="leaderboard-card-container empty-state-card p-5 rounded-4 text-center d-flex flex-column align-items-center justify-content-center w-100">
              <div className="empty-trophy-icon mb-3">
                <i className="bi bi-trophy fs-1 text-muted"></i>
              </div>
              <h3 className="fw-bold mb-2">No players yet</h3>
              <p className="text-secondary-white fs-6 m-0">
                Be the first to complete a level!
              </p>
            </div>
          </div>
        ) : (
          /* Active Leaderboard List View */
          <div className="leaderboard-card-container p-4 rounded-4 w-100 d-flex flex-column gap-3">
            {players.map((player, index) => {
              const rank = index + 1;
              let rankBadgeClass = "rank-default";

              if (rank === 1) rankBadgeClass = "rank-bronze";
              if (rank === 2) rankBadgeClass = "rank-gold";
              if (rank === 3) rankBadgeClass = "rank-silver";

              return (
                <div
                  key={player.id || index}
                  className={`player-row d-flex align-items-center justify-content-between p-3 rounded-4 ${rank <= 3 ? `top-rank-row-${rank}` : ""}`}
                >
                  <div className="d-flex align-items-center gap-3">
                    {/* Rank Indicator */}
                    <div
                      className={`rank-badge d-flex align-items-center justify-content-center fw-bold shadow-sm ${rankBadgeClass}`}
                    >
                      {rank <= 3 ? (
                        <i className="bi bi-trophy-fill"></i>
                      ) : (
                        `#${rank}`
                      )}
                    </div>

                    {/* Player Details */}
                    <div>
                      <h5 className="m-0 fw-bold tracking-wide player-name">
                        {player.fullname}
                      </h5>
                      <div className="d-flex align-items-center gap-3 mt-1 text-secondary-white small-meta">
                        <span>
                          <i className="bi bi-star"></i> Level{" "}
                          {player.currentlevel}
                        </span>
                        <span>
                          <i className="bi bi-check-circle"></i>{" "}
                          {player.completedlevel} Complete
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coin Score Badge */}
                  <div className="coin-badge d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-bold shadow-sm">
                    <span className="coin-icon">
                      <i className="bi bi-coin text-white"></i>
                    </span>
                    <span className="coin-amount">{player.coincollected}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default leaderboardPage;
