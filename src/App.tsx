import { useState } from "react";
import StartScreen from "./StartScreen";
import IntroScreen from "./IntroScreen";
import GameOne from "./GameOne";
import GameTwo from "./GameTwo";
import GameThree from "./GameThree";
import BackgroundMusic from "./BackgroundMusic"; // 👈 plays globally

export default function App() {
  const [stage, setStage] = useState<
    "start" | "intro" | "game1" | "game2" | "game3"
  >("start");

  return (
    <div className="app">
      {/* 🎶 Music runs from the very beginning */}
      <BackgroundMusic />

      {stage === "start" && <StartScreen onStart={() => setStage("intro")} />}
      {stage === "intro" && <IntroScreen onContinue={() => setStage("game1")} />}
      {stage === "game1" && <GameOne onNext={() => setStage("game2")} />}
      {stage === "game2" && <GameTwo onNext={() => setStage("game3")} />}
      {stage === "game3" && <GameThree />}
    </div>
  );
}
