import "./App.css";
import GameUI from "./pages/GamePage/GameUI";
import Home from "./pages/HomePage/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";

function App() {
  return (
    <>
      {/* <GameUI /> */}
      {/* <Home /> */}

      {/*My Routes*/}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
