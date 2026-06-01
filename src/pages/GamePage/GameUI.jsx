import { useState } from "react";
import Canvas from "../../components/Canvas/Canvas.jsx";
import Score from "../../components/Score/Score.jsx";
import Lives from "../../components/Lives/Lives.jsx";
import GameOverlay from "../../components/OverLayCard/OverLayCard.jsx";
import "./GameUI.css";
const GameUI = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("playing");
  const [currentLevel, setCurrentLevel] = useState(0);

  // Reset function for coins/score
  const handleScoreReset = () => {
    setScore(0);
  };

  const handleCoinCollect = (coins) => {
    setScore((prev) => prev + coins);
  };

  const handleEnemyKill = (points = 50) => {
    setScore((prev) => prev + points);
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

  const handleWin = () => {
    setGameState("win");
  };
  const handleNextLevel = () => {
    setCurrentLevel((prev) => {
      if (prev < 5) {
        return prev + 1;
      }

      return prev;
    });

    setScore(0);

    setLives(3);

    setGameState("playing");
  };

  const resetGame = () => {
    setScore(0);

    setLives(3);

    setGameState("playing");
  };

  return (
    <div className="gameUI-parent-container d-flex flex-column align-items-center justify-content-center p-3">
      {/* Floating Glassmorphic Back Button */}
      <button
        className="game-back-btn"
        aria-label="Go back"
        onClick={() => window.history.back()}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      {/* Full-width HUD that stays separated from the canvas top */}
      <div className="hud-header d-flex justify-content-between align-items-center w-100 px-4">
        <Score score={score} />
        <Lives lives={lives} />
      </div>

      {/* Centralized Game Container */}
      <div className="game-container w-100 d-flex justify-content-center align-items-center">
        {gameState !== "playing" && (
          <GameOverlay
            gameState={gameState}
            score={score}
            onRestart={resetGame}
            onNextLevel={handleNextLevel}
          />
        )}

        <div className="canvas-wrapper position-relative">
          <Canvas
            gameState={gameState}
            currentLevel={currentLevel}
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
