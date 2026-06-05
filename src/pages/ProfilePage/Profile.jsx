import { Link } from "react-router-dom";
import "./Profile.css";
import { useEffect, useState } from "react";
const Profile = ({ user, handleLogout }) => {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${user.id}/achievements`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to pull achievements data");
        return res.json();
      })
      .then((data) => {
        setAchievements(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error gathering profile achievements:", err);
        setIsLoading(false);
      });
  }, [user.id]);
  const unlockedCount = achievements.filter((ach) => ach.isUnlocked).length;
  return (
    <div className="game-bg min-vh-100 text-white py-4 px-3 px-md-5 d-flex flex-column align-items-center">
      <div className="container-fluid max-width-profile position-relative d-flex flex-column gap-4">
        {/* Navbar Section */}
        <div className="d-flex justify-content-between align-items-center w-100 header-wrapper">
          <Link to="/LevelSelection">
            <button className="btn btn-outline-light back-arrow-btn">
              <i className="bi bi-arrow-left"></i>
            </button>
          </Link>
          <h1 className="fw-bold m-0 profile-title-text text-center flex-grow-1">
            Profile
          </h1>
          <div className="d-flex gap-2">
            <Link
              to="/Settings"
              className="btn btn-outline-light action-btn px-3 py-2 fw-semibold"
            >
              <i className="bi bi-gear-fill me-2"></i>Settings
            </Link>
            <button
              className="btn btn-danger btn-logout px-3 py-2 fw-semibold"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </div>
        </div>

        {/* Main User Card Container */}
        <div className="profile-master-card p-4 rounded-4 w-100">
          <div className="row align-items-center g-4">
            {/* Avatar and Basic User Details */}
            <div className="col-12 col-md-5 d-flex align-items-center gap-4">
              <div className="profile-avatar-box d-flex align-items-center justify-content-center fw-bold text-white shadow">
                {user.fullname.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="m-0 fw-bold user-display-name">
                  {user.fullname}
                </h2>
                <p className="m-0 text-secondary-white text-lowercase mt-1">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Quick Stats Grid Row */}
            <div className="col-12 col-md-7">
              <div className="row g-3">
                {/* Current Level Stat */}
                <div className="col-4">
                  <div className="stat-pill p-3 rounded-3 d-flex align-items-center gap-3">
                    <div className="stat-icon-wrapper lvl-purple shadow-sm">
                      <i className="bi bi-trophy-fill"></i>
                    </div>
                    <div>
                      <small className="d-block text-secondary-white stat-lbl">
                        Current Level
                      </small>
                      <span className="fw-bold stat-val">
                        {user.currentlevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Coins Stat */}
                <div className="col-4">
                  <div className="stat-pill p-3 rounded-3 d-flex align-items-center gap-3">
                    <div className="stat-icon-wrapper coin-orange shadow-sm">
                      <i className="bi bi-coin"></i>
                    </div>
                    <div>
                      <small className="d-block text-secondary-white stat-lbl">
                        Total Coins
                      </small>
                      <span className="fw-bold stat-val">
                        {user.coincollected}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Levels Completed Stat */}
                <div className="col-4">
                  <div className="stat-pill p-3 rounded-3 d-flex align-items-center gap-3">
                    <div className="stat-icon-wrapper cmp-green shadow-sm">
                      <i className="bi bi-patch-check-fill"></i>
                    </div>
                    <div>
                      <small className="d-block text-secondary-white stat-lbl">
                        Completed
                      </small>
                      <span className="fw-bold stat-val">
                        {user.completedlevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Achievements Block Container */}
        <div className="profile-master-card p-4 rounded-4 w-100">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold m-0 d-flex align-items-center gap-2 block-title">
              <i className="bi bi-trophy text-warning"></i> Achievements
            </h4>
            <span className="badge achievement-counter-badge px-3 py-2 rounded-pill">
              {isLoading ? "..." : `${unlockedCount}/${achievements.length}`}{" "}
              Unlocked
            </span>
          </div>

          {/* Loader or dynamic listing output matrix mapping split */}
          {isLoading ? (
            <div className="text-center py-4 text-secondary-white">
              Loading Achievements...
            </div>
          ) : (
            <div className="row g-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="col-12 col-sm-6 col-md-4">
                  <div
                    className={`achievement-box p-4 rounded-4 text-center d-flex flex-column align-items-center justify-content-center ${
                      achievement.isUnlocked
                        ? "unlocked-state text-warning"
                        : "locked-state option-muted"
                    }`}
                  >
                    <div className="achievement-icon-placeholder mb-3">
                      <i
                        className={`bi ${
                          achievement.isUnlocked
                            ? "bi-patch-check text-warning fs-3 animate-pulse"
                            : "bi-lock-fill text-muted"
                        }`}
                      ></i>
                    </div>
                    <h6
                      className={`fw-bold m-0 ${achievement.isUnlocked ? "text-warning" : "text-muted"}`}
                    >
                      {achievement.title}
                    </h6>
                    <small
                      className={
                        achievement.isUnlocked
                          ? "text-white"
                          : "text-secondary-white"
                      }
                    >
                      {achievement.description}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
