import { useState, useRef } from "react"; // 1. Import useRef
import Canvas from "../../components/Canvas/Canvas.jsx";
import Score from "../../components/Score/Score.jsx";
import Lives from "../../components/Lives/Lives.jsx";
import GameOverlay from "../../components/OverLayCard/OverLayCard.jsx";
import "./GameUI.css";
import { useParams } from "react-router-dom";

const GameUI = ({ user, onUserUpdate }) => {
  const { id } = useParams();
  const levelIndex = parseInt(id) - 1;

  const [score, setScore] = useState(0);
  // 2. Maintain an exact snapshot reference of the score
  const scoreRef = useRef(0);

  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("playing");

  // 3. Keep state and ref synchronous
  const handleScoreReset = () => {
    setScore(0);
    scoreRef.current = 0;
  };

  const handleCoinCollect = (coins) => {
    setScore((prev) => {
      const newScore = prev + coins;
      scoreRef.current = newScore; // Keep tracking register fresh
      return newScore;
    });
  };

  const handleEnemyKill = (points = 50) => {
    setScore((prev) => {
      const newScore = prev + points;
      scoreRef.current = newScore; // Keep tracking register fresh
      return newScore;
    });
  };

  const handlePlayerDeath = () => {
    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameState("lose");
        return 0;
      }
      return newLives;
    });
    handleScoreReset();
  };

  const handleWin = async () => {
    setGameState("win");

    try {
      const activeUser = user || JSON.parse(localStorage.getItem("user"));
      if (!activeUser) return;

      const currentPlayedLevelId = levelIndex + 1;

      // 4. Send the completely accurate, unstale value from your ref!
      console.log("Saving score:", scoreRef.current);

      const res = await fetch(
        `http://localhost:3000/api/users/${activeUser.id}/win`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            additionalCoins: scoreRef.current, // Always fresh
            currentPlayedLevelId: currentPlayedLevelId,
          }),
        },
      );

      if (res.ok) {
        const updatedUser = await res.json();
        onUserUpdate(updatedUser);
      }
    } catch (err) {
      console.error("Failed to save level progress and coins:", err);
    }
  };

  const resetGame = () => {
    handleScoreReset();
    setLives(3);
    setGameState("playing");
  };

  return (
    <div className="gameUI-parent-container d-flex flex-column align-items-center justify-content-center p-3">
      <div className="back-btn-row w-100 d-flex justify-content-start px-4">
        <button
          className="game-back-btn"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>
      <div className="hud-header d-flex justify-content-between align-items-center w-100 px-4">
        <Score score={score} />
        <Lives lives={lives} />
      </div>
      <div className="game-container w-100 d-flex justify-content-center align-items-center">
        {gameState !== "playing" && (
          <GameOverlay
            gameState={gameState}
            score={score}
            onRestart={resetGame}
          />
        )}

        <div className="canvas-wrapper position-relative">
          <Canvas
            gameState={gameState}
            currentLevel={levelIndex}
            onCoinCollect={handleCoinCollect}
            onEnemyKill={handleEnemyKill}
            onPlayerDeath={handlePlayerDeath}
            onWin={handleWin}
            onScoreReset={handleScoreReset}
          />
        </div>
      </div>
    </div>
  );
};

export default GameUI;
