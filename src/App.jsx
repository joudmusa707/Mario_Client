import "./App.css";

import Home from "./pages/HomePage/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";
import GameUI from "./pages/GamePage/GameUI.jsx";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignUp = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <>
      {/*My Routes*/}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/SignUp"
            element={
              user ? (
                <Navigate to="/Game" />
              ) : (
                <SignUp onSignUp={handleSignUp} />
              )
            }
          />
          <Route path="/Game" element={<GameUI />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
