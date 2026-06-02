import "./App.css";

import Home from "./pages/HomePage/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";
import GameUI from "./pages/GamePage/GameUI.jsx";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LevelSelection from "./pages/LevelSelectionPage/LevelSelection.jsx";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
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
          <Route path="/Game" element={<GameUI />} />
          <Route
            path="/LevelSelection"
            element={
              user ? <LevelSelection user={user} /> : <Navigate to="/Login" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
