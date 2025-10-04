import React from "react";

const GameThree: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
        color: "#e0d6ff",
        fontFamily: "serif",
        padding: "1rem",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#bb86fc" }}>
        🌀 Next Challenge Coming Soon...
      </h2>
      <p style={{ maxWidth: "600px", textAlign: "center", fontSize: "1.3rem" }}>
        The Witch has more mysteries in store. Prepare yourself for the third trial!
      </p>
    </div>
  );
};

export default GameThree;
