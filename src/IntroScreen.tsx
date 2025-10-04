import React, { useEffect, useState } from "react";

interface IntroScreenProps {
  onContinue: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  const [showWitch, setShowWitch] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const witchTimer = setTimeout(() => setShowWitch(true), 200);
    const textTimer = setTimeout(() => setShowText(true), 600);
    const buttonTimer = setTimeout(() => setShowButton(true), 2600);

    return () => {
      clearTimeout(witchTimer);
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
        color: "#e0d6ff",
        fontFamily: "serif",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      {/* Witch Character */}
      <img
        src="/witch.png"
        alt="Witch"
        style={{
          width: "200px",
          height: "auto",
          marginBottom: "1.5rem",
          opacity: showWitch ? 1 : 0,
          transition: "opacity 2s ease-in",
        }}
      />

      {/* Intro Text */}
      <p
        style={{
          maxWidth: "600px",
          fontSize: "1.3rem",
          lineHeight: "1.8rem",
          opacity: showText ? 1 : 0,
          transition: "opacity 2s ease-in",
          marginBottom: "4rem", // reserve space for button
        }}
      >
        Welcome, traveler... I am the Witch who guards these mysteries.
        Ahead lie challenges hidden in riddles, puzzles, and whispers.
        Each clue I give you will guide your path... or lead you astray.
        Are you brave enough to uncover the truth?
      </p>

      {/* Always present button, fades in */}
      <button
        onClick={onContinue}
        style={{
          padding: "0.8rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "8px",
          border: "2px solid #bb86fc",
          backgroundColor: "#121212",
          color: "#bb86fc",
          fontWeight: "bold",
          cursor: showButton ? "pointer" : "default",
          opacity: showButton ? 1 : 0,
          transition: "opacity 1s ease-in",
          pointerEvents: showButton ? "auto" : "none",
        }}
      >
        I'm Ready
      </button>
    </div>
  );
};

export default IntroScreen;
