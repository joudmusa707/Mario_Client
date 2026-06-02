import { useState } from "react";
import Canvas from "../../components/Canvas/Canvas.jsx";
import Score from "../../components/Score/Score.jsx";
import Lives from "../../components/Lives/Lives.jsx";
import GameOverlay from "../../components/OverLayCard/OverLayCard.jsx";
import "./GameUI.css";
import { useParams } from "react-router-dom";

const GameUI = ({ user, onUserUpdate }) => {
  const { id } = useParams();

  // Array indices start at 0, while Level ID representations typically start at 1.
  // We subtract 1 to ensure that hitting `/game/1` correctly grabs `levels[0]` (Level1).
  const levelIndex = parseInt(id) - 1;

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("playing");

  const handleScoreReset = () => setScore(0);
  const handleCoinCollect = (coins) => setScore((prev) => prev + coins);
  const handleEnemyKill = (points = 50) => setScore((prev) => prev + points);

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
      // Prioritize props user data, fall back to localStorage just in case
      const activeUser = user || JSON.parse(localStorage.getItem("user"));
      if (!activeUser) return;

      const currentPlayedLevelId = levelIndex + 1; // e.g., 1 if they just beat Level 1
      const nextLevelValue = currentPlayedLevelId + 1; // e.g., 2
      const currentCompletedInDb = activeUser.completedlevel || 0;

      // Keep whichever value is higher so replaying an old level doesn't decrease progress
      const systemNewCompletedLevel = Math.max(
        currentCompletedInDb,
        currentPlayedLevelId,
      );

      const res = await fetch(
        `http://localhost:3000/api/users/${activeUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: activeUser.fullname,
            email: activeUser.email,
            completedlevel: systemNewCompletedLevel,
            currentlevel: nextLevelValue,
            coincollected: activeUser.coincollected + score, // Calculates total coins (existing + earned)
          }),
        },
      );

      if (res.ok) {
        const updatedUser = await res.json();

        // Updates both localStorage AND your parent App.jsx component state synchronously
        onUserUpdate(updatedUser);
      }
    } catch (err) {
      console.error("Failed to save level progress and coins:", err);
    }
  };

  const resetGame = () => {
    setScore(0);
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
