import React, { useEffect, useState } from "react";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 500);
    const buttonTimer = setTimeout(() => setShowButton(true), 3000);
    return () => {
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
        fontFamily: "serif",
      }}
    >
      {/* Spooky Intro Text */}
      <h2
        style={{
          color: "#bb86fc",
          fontSize: "2rem",
          marginBottom: "6rem", // 👈 extra space reserved for button
          opacity: showText ? 1 : 0,
          transition: "opacity 2.5s ease-in",
          textAlign: "center",
          animation: showText ? "flicker 3s infinite" : "none",
        }}
      >
        Are you ready to take on the Witch&apos;s challenge?
      </h2>

      {/* Button always rendered but fades in */}
      <button
        onClick={onStart}
        style={{
          padding: "1rem 2.5rem",
          fontSize: "1.5rem",
          borderRadius: "8px",
          border: "2px solid #bb86fc",
          backgroundColor: "#121212",
          color: "#bb86fc",
          fontWeight: "bold",
          cursor: showButton ? "pointer" : "default",
          opacity: showButton ? 1 : 0, // 👈 fade in
          transition: "opacity 1.5s ease-in",
          animation: showButton ? "flicker 3s infinite" : "none",
          pointerEvents: showButton ? "auto" : "none", // disables click until visible
        }}
      >
        Start Game
      </button>

      {/* Flicker Keyframes */}
      <style>
        {`
          @keyframes flicker {
            0% { opacity: 1; }
            5% { opacity: 0.8; }
            10% { opacity: 1; }
            15% { opacity: 0.6; }
            20% { opacity: 1; }
            25% { opacity: 0.9; }
            30% { opacity: 1; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default StartScreen;
