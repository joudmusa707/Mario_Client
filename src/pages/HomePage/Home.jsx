import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <div className="mario-home-wrapper position-relative d-flex flex-column">
      {/* Animated Clouds Background Layer */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden pe-none">
        <div
          className="cloud position-absolute bg-white opacity-20 rounded-circle cloud-blur animate-cloud-slow"
          style={{ top: "20px", left: "0", width: "128px", height: "64px" }}
        ></div>
        <div
          className="cloud position-absolute bg-white opacity-10 rounded-circle cloud-blur animate-cloud-medium"
          style={{ top: "160px", left: "25%", width: "160px", height: "80px" }}
        ></div>
        <div
          className="cloud position-absolute bg-white opacity-20 rounded-circle cloud-blur animate-cloud-fast"
          style={{ top: "128px", right: "0", width: "144px", height: "72px" }}
        ></div>
        <div
          className="cloud position-absolute bg-white opacity-10 rounded-circle cloud-blur animate-cloud-slow"
          style={{ top: "240px", left: "50%", width: "112px", height: "56px" }}
        ></div>
      </div>

      {/* Main Content Area */}
      <Container
        fluid
        className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-4 position-relative z-index-10"
      >
        <div className="text-center">
          {/* Title with 3D Effect */}
          <h1 className="text-white text-uppercase display-1 mb-4 mario-title">
            Super Mario
          </h1>

          {/* Subtitle */}
          <p className="text-warning display-5 mb-5 mario-subtitle">
            Adventure Awaits!
          </p>

          {/* Action Buttons */}
          <div className="d-flex flex-column flex-sm-row gap-4 justify-content-center align-items-center mt-4">
            <Link to="/Login" className="w-100 w-sm-auto text-decoration-none">
              <Button className="mario-btn-login px-5 py-3 text-white border-4 rounded-4 transition-all w-100">
                LOGIN
              </Button>
            </Link>

            <Link to="/SignUp" className="w-100 w-sm-auto text-decoration-none">
              <Button className="mario-btn-signup px-5 py-3 text-white border-0 rounded-4 transition-all w-100">
                SIGN UP
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Ground Section */}
      <div className="position-relative z-index-10 mt-auto w-100">
        {/* Yellow top border strip */}
        <div className="w-100 mario-ground-border"></div>

        {/* Ground platform brick layout */}
        <div className="py-4 w-100 mario-ground-platform">
          <div className="px-4">
            {/* The auto-filling block container */}
            <div className="mario-brick-container">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="rounded-1 mario-brick"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
