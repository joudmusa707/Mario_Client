import "./OverLayCard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

function OverLayCard({ gameState, score, onRestart }) {
  const isWin = gameState === "win";
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://api.kanye.rest/")
      .then((res) => res.json())
      .then((data) => setQuote(data.quote))
      .catch((err) => console.error("Error fetching quote:", err));
  }, [gameState]);

  return (
    <div className="overlay-card">
      <h1 className={`overlay-title ${isWin ? "win-text" : "lose-text"}`}>
        {isWin ? "LEVEL COMPLETE" : "GAME OVER"}
      </h1>

      <p className="overlay-score">Score: {score}</p>
      <div>
        <p className="positive-message">{quote}</p>
      </div>
      <div className="overlay-actions">
        <button onClick={onRestart} className="btn btn-restart">
          Restart
        </button>

        {isWin && (
          /* Change this from a button execution to a routing Link wrapper */
          <Link
            to="/LevelSelection"
            className="btn btn-next text-decoration-none"
          >
            Back to Levels
          </Link>
        )}
      </div>
    </div>
  );
}

export default OverLayCard;
