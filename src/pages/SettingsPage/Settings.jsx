import "./Settings.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Settings = ({ user, updateUserInfo }) => {
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserInfo({ fullname, email });
  };
  return (
    <div className="game-bg min-vh-100 text-white py-4 px-3 px-md-5 d-flex flex-column align-items-center">
      <div className="container-fluid max-width-settings position-relative d-flex flex-column gap-4">
        {/* Header Section */}
        <div className="d-flex justify-content-center align-items-center mb-2 position-relative w-100 header-wrapper">
          <Link to="/Profile">
            <button className="btn btn-outline-light back-arrow-btn position-absolute start-0">
              <i className="bi bi-arrow-left"></i>
            </button>
          </Link>
          <h1 className="fw-bold m-0 settings-title-text">Settings</h1>
        </div>

        {/* Box 1: Profile Information */}
        <div className="settings-card p-4 rounded-4 w-100">
          <h4 className="fw-bold mb-4 d-flex align-items-center gap-2 section-title">
            <i className="bi bi-person-fill"></i> Profile Information
          </h4>

          <form onSubmit={(e) => handleUpdate(e)}>
            <div className="mb-3">
              <label className="form-label text-secondary-white small fw-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="form-control custom-input px-3 py-2 text-white"
                defaultValue={user.fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary-white small fw-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="form-control custom-input px-3 py-2 text-white"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-save w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
            >
              <i className="bi bi-floppy-fill"></i> Save Changes
            </button>
          </form>
        </div>

        {/* Box 2: Game Progress */}
        <div className="settings-card p-4 rounded-4 w-100">
          <h4 className="fw-bold mb-3 d-flex align-items-center gap-2 section-title">
            <i className="bi bi-arrow-counterclockwise"></i> Game Progress
          </h4>
          <p className="text-secondary-white text-muted-desc mb-4">
            Reset all your game progress including coins, levels, and
            achievements. This action cannot be undone.
          </p>
          <button
            className="btn btn-orange-reset w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
            onClick={() => updateUserInfo({ resetProgress: true })}
          >
            <i className="bi bi-arrow-counterclockwise"></i> Reset Progress
          </button>
        </div>

        {/* Box 3: Danger Zone */}
        <div className="settings-card p-4 rounded-4 w-100">
          <h4 className="fw-bold mb-3 d-flex align-items-center gap-2 section-title text-danger-title">
            <i className="bi bi-trash3-fill"></i> Danger Zone
          </h4>
          <p className="text-secondary-white text-muted-desc mb-4">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <button
            className="btn btn-red-delete w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
            onClick={() => updateUserInfo({ deleteAccount: true })}
          >
            <i className="bi bi-trash3-fill"></i> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
export default Settings;
