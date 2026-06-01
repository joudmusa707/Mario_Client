import "./OverLayCard.css";
import { useState, useEffect } from "react";
function OverLayCard({ gameState, score, onRestart, onNextLevel }) {
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
      {/* Dynamic template literal to handle the conditional color class */}
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
          <button onClick={onNextLevel} className="btn btn-next">
            Next Level
          </button>
        )}
      </div>
    </div>
  );
}

export default OverLayCard;
