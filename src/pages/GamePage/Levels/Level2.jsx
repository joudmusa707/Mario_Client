import Platform from "../../../components/Platform.jsx";
import Enemy from "../../../components/Enemy.jsx";
import Coin from "../../../components/Coin.jsx";
import GenericObject from "../../../components/GenericObject.jsx";

const Level2 = ({
  platformImg,
  platformSmallTallImg,
  backgroundImg,
  hillsImg,
  enemyImg,
}) => {
  const genericObjects = [
    new GenericObject({ x: -1, y: -1, image: backgroundImg }),
    new GenericObject({ x: 0, y: 0, image: hillsImg }),
  ];

  // Base platform width helper to keep math clean
  const pWidth = platformImg.width;

  const platforms = [
    // Starting Ground
    new Platform(-1, 470, platformImg),

    // Second platform: Just a clean 120px gap from the first one
    new Platform(pWidth + 120, 470, platformImg),

    // Third platform: Slightly elevated, 150px gap
    new Platform(pWidth * 2 + 270, 420, platformImg),

    // Fourth platform: Step up, keeping the gap to a safe 160px
    new Platform(pWidth * 3 + 430, 370, platformImg),

    // Fifth platform: Dropping back down, 150px gap
    new Platform(pWidth * 4 + 580, 470, platformImg),

    // Floating small step 1: Tight 130px gap to jump onto the pillar
    new Platform(
      pWidth * 5 + 710,
      380, // Lowered from 300 to 380 so it's a manageable vertical step
      platformSmallTallImg,
      80,
      80,
    ),

    // Floating small step 2: 120px jump from the previous pillar
    new Platform(
      pWidth * 5 + 910,
      300, // Safe gradual climb up from 380
      platformSmallTallImg,
      80,
      80,
    ),

    // Final Level Run: Landing pad after the pillars
    new Platform(pWidth * 5 + 1110, 380, platformImg),
  ];

  const coins = [];

  platforms.forEach((platform) => {
    coins.push(
      new Coin({
        x: platform.position.x + platform.width / 3,
        y: platform.position.y - 50,
      }),
    );
  });

  // Positioned the enemy dynamically onto the 5th platform layout
  const enemies = [
    new Enemy({
      x: pWidth * 4 + 650,
      y: 470 - 50,
      image: enemyImg,
      distance: 200,
    }),
  ];

  return {
    genericObjects,
    platforms,
    coins,
    enemies,
    winOffset: pWidth * 5 + 1110, // Adjusted dynamically based on your new track length
  };
};

export default Level2;
