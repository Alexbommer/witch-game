import React, { useState, useEffect } from "react";

interface GameOneProps {
  onNext: () => void; // move to next game
}

const GameOne: React.FC<GameOneProps> = ({ onNext }) => {
  const [playerHands, setPlayerHands] = useState<string[]>([]);
  const [selectedWinner, setSelectedWinner] = useState("");
  const [showControls, setShowControls] = useState(false);

  const gestures = ["rock", "paper", "scissor"];

  useEffect(() => {
    assignHands();

    // Delay showing controls for a smoother transition
    const timer = setTimeout(() => setShowControls(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Randomly assign gestures to 6 players
  const assignHands = () => {
    const hands = Array.from({ length: 6 }, () => {
      const random = Math.floor(Math.random() * gestures.length);
      return gestures[random];
    });
    setPlayerHands(hands);
    setSelectedWinner("");
  };

  // Value map
  const getHandValue = (hand: string): number => {
    if (hand === "rock") return 0;
    if (hand === "scissor") return 2;
    if (hand === "paper") return 5;
    return 0;
  };

  // Calculate winner
  const calculateWinner = (): number => {
    const total = playerHands.reduce((sum, hand) => sum + getHandValue(hand), 0);
    const winnerIndex = (total - 1) % 6;
    return winnerIndex + 1;
  };

  // Verify answer
  const checkAnswer = () => {
    const correctWinner = calculateWinner();
    if (parseInt(selectedWinner) === correctWinner) {
      alert(
        `✅ Correct! Player ${correctWinner} wins this round.\n\n` +
          `The Witch whispers:\n` +
          `"The true magic lies in numbers. Each hand has a hidden value —\n` +
          `Rock holds the strength of 0,\nScissor cuts with 2,\nPaper conceals 5.\n\n` +
          `Add them together, and destiny spins its wheel.\n` +
          `Count the total around the circle of challengers,\n` +
          `and the one it lands upon is the victor.\n\n` +
          `This is the magic you’ve uncovered."`
      );
      onNext();
    } else {
      alert(`❌ Wrong! Player ${correctWinner} actually wins.`);
      assignHands();
    }
  };

  const getHandImage = (hand: string) => `/${hand}.png`;

  // Render one player and their gesture
  const renderPlayer = (
    id: number,
    position: "top" | "bottom" | "left" | "right"
  ) => {
    const avatar = (
      <img src="/user.png" alt={`Player ${id}`} style={{ width: "80px" }} />
    );

    const hand = playerHands[id - 1] ? (
      <img
        src={getHandImage(playerHands[id - 1])}
        alt={playerHands[id - 1]}
        style={{
          width: "50px",
          margin: "0.3rem",
          transform:
            position === "top"
              ? "translateY(20px) rotate(10deg)"
              : position === "bottom"
              ? "translateY(-20px) rotate(-10deg)"
              : position === "left"
              ? "translateX(25px) rotate(15deg)"
              : "translateX(-25px) rotate(-15deg)",
        }}
      />
    ) : null;

    let content;
    if (position === "top") {
      content = (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {avatar}
          {hand}
        </div>
      );
    }
    if (position === "bottom") {
      content = (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {hand}
          {avatar}
        </div>
      );
    }
    if (position === "left") {
      content = (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          {avatar}
          {hand}
        </div>
      );
    }
    if (position === "right") {
      content = (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          {hand}
          {avatar}
        </div>
      );
    }

    return (
      <div style={{ textAlign: "center" }}>
        {content}
        <p>Player {id}</p>
      </div>
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
        color: "#e0d6ff",
        fontFamily: "serif",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <h2
        style={{
          marginBottom: "2rem",
          fontSize: "1.8rem",
          color: "#bb86fc",
        }}
      >
        Who will win the Rock-Paper-Scissors game?
      </h2>

      {/* Player Pyramid (anchor for controls) */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          marginTop: "1rem",
        }}
      >
        {renderPlayer(1, "top")}

        <div style={{ display: "flex", gap: "22rem" }}>
          {renderPlayer(6, "left")}
          {renderPlayer(2, "right")}
        </div>

        <div style={{ display: "flex", gap: "22rem" }}>
          {renderPlayer(5, "left")}
          {renderPlayer(3, "right")}
        </div>

        {renderPlayer(4, "bottom")}

        {/* Overlay Controls (centered in pyramid) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.8rem",
            opacity: showControls ? 1 : 0,
            transition: "opacity 1s ease-in",
            zIndex: 10,
          }}
        >
          <button
            style={{
              padding: "0.8rem 2rem",
              fontSize: "1.2rem",
              borderRadius: "8px",
              border: "2px solid #bb86fc",
              backgroundColor: "#121212",
              color: "#bb86fc",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={assignHands}
          >
            Play Round
          </button>

          <select
            value={selectedWinner}
            onChange={(e) => setSelectedWinner(e.target.value)}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              border: "2px solid #bb86fc",
              backgroundColor: "#121212",
              color: "#e0d6ff",
              fontSize: "1rem",
              width: "220px",
            }}
          >
            <option value="">Select the winner...</option>
            {[1, 2, 3, 4, 5, 6].map((p) => (
              <option key={p} value={p}>
                Player {p}
              </option>
            ))}
          </select>

          <button
            onClick={checkAnswer}
            disabled={!selectedWinner}
            style={{
              padding: "0.6rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "2px solid #bb86fc",
              backgroundColor: selectedWinner ? "#121212" : "#333",
              color: "#bb86fc",
              fontWeight: "bold",
              cursor: selectedWinner ? "pointer" : "not-allowed",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOne;
