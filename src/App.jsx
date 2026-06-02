import "./App.css";

import Home from "./pages/HomePage/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";
import GameUI from "./pages/GamePage/GameUI.jsx";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LevelSelection from "./pages/LevelSelectionPage/LevelSelection.jsx";
import Leaderboard from "./pages/LeaderboardPage/leadboardPage.jsx";
import Profile from "./pages/ProfilePage/Profile.jsx";
import Settings from "./pages/SettingsPage/Settings.jsx";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const updateUserInfo = async (updateData) => {
    // CASE 1: Delete Account
    if (updateData.deleteAccount) {
      try {
        await fetch(`http://localhost:3000/api/users/${user.id}`, {
          method: "DELETE",
        });
        handleLogout();
        alert("Account deleted successfully.");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
      return;
    }
    // // CASE 2: Reset Progress
    if (updateData.resetProgress) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/${user.id}/progress`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resetProgress: true,
            }),
          },
        );
        if (!res.ok) {
          throw new Error("Failed to reset progress on server");
        }
        const data = await res.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        alert("Game progress has been reset successfully!");
      } catch (err) {
        console.error("Caught error in Reset Progress:", err);
        alert(`Could not reset progress. Error: ${err.message}`);
      }
    }
    // // CASE 3: Standard Profile Information Update (Full Name / Email)
    if (updateData.fullname !== undefined || updateData.email !== undefined)
      try {
        const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: updateData.fullname,
            email: updateData.email,
          }),
        });
        const data = await res.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
  };

  if (loading) {
    return <div className="text-white text-center mt-5">Loading app...</div>;
  }
  return (
    <>
      {/*My Routes*/}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Login"
            element={
              user ? (
                <Navigate to="/LevelSelection" />
              ) : (
                <Login onLogin={handleAuth} />
              )
            }
          />
          <Route
            path="/SignUp"
            element={
              user ? (
                <Navigate to="/LevelSelection" />
              ) : (
                <SignUp onSignUp={handleAuth} />
              )
            }
          />
          <Route
            path="/game/:id"
            element={
              user ? (
                <GameUI user={user} onUserUpdate={handleAuth} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          <Route
            path="/LevelSelection"
            element={
              user ? (
                <LevelSelection user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          <Route
            path="/leaderboard"
            element={user ? <Leaderboard /> : <Navigate to="/Login" />}
          />
          <Route
            path="/Profile"
            element={
              user ? (
                <Profile user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          <Route
            path="/Settings"
            element={
              user ? (
                <Settings user={user} updateUserInfo={updateUserInfo} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
