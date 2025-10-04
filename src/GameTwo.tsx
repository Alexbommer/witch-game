import React, { useState, useEffect } from "react";

interface GameTwoProps {
  onNext: () => void;
}

const GameTwo: React.FC<GameTwoProps> = ({ onNext }) => {
  const [question, setQuestion] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showControls, setShowControls] = useState(false);

  // Pool of mosquito questions (all between 5–15 words)
  const questions: string[] = [
    "How many mosquito do you think we have in this room here?",
    "Can you guess how many mosquito are buzzing around this dark place?",
    "Tell me, how many mosquito do you hear in the silence of night?",
    "Count them if you can, how many mosquito fill this hidden chamber?",
    "Do you know how many mosquito fly with me in this cursed air?",
    "How many mosquito do you imagine crawl along these haunted walls tonight?",
    "Buzzing and lurking, how many mosquito do you think surround us now?",
    "If you listen close, how many mosquito sing in this shadowed hall?",
    "The night is heavy, how many mosquito fly near your ear now?",
    "Tell me quickly, how many mosquito are drifting around us this moment?",
    "You cannot escape, how many mosquito do you feel crawling here?",
    "Strange sounds rise, how many mosquito whisper secrets in the dark?",
    "Count carefully, how many mosquito rest quietly between these broken walls?",
    "Answer me mortal, how many mosquito follow your breath in silence?",
    "Hear them buzz, how many mosquito keep you from sleeping tonight?",
    "Your eyes deceive you, how many mosquito fly beyond your reach now?",
    "My wings carry truth, how many mosquito circle this cursed room?",
    "Dare to guess, how many mosquito accompany me this haunted night?",
    "The shadows stir, how many mosquito fill the air around you?",
    "Fear the silence, how many mosquito hide waiting in this room?",
  ];

  useEffect(() => {
    generateQuestion();

    // Fade controls after 1s
    const timer = setTimeout(() => setShowControls(true), 1000);

    // Inject buzzing animation into <head> (only once)
    if (typeof document !== "undefined" && !document.getElementById("buzz-style")) {
      const styleTag = document.createElement("style");
      styleTag.id = "buzz-style";
      styleTag.innerHTML = `
        @keyframes buzz {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(1px, -1px) rotate(-1deg); }
          50% { transform: translate(-1px, 1px) rotate(1deg); }
          75% { transform: translate(1px, 1px) rotate(0deg); }
          100% { transform: translate(0px, 0px) rotate(-1deg); }
        }
      `;
      document.head.appendChild(styleTag);
    }

    return () => clearTimeout(timer);
  }, []);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setQuestion(questions[randomIndex]);
    setSelectedAnswer("");
  };

  const getCorrectAnswer = () => {
    return question.split(" ").length;
  };

  const checkAnswer = () => {
    const correct = getCorrectAnswer();
    if (parseInt(selectedAnswer) === correct) {
      alert(
        `✅ Correct!\n\n` +
        `The mosquito’s question carried its own secret.\n\n` +
        `The Witch reveals:\n` +
        `"Each buzzing phrase hides its answer within itself.\n` +
        `Count the words, not the wings, and truth is revealed.\n` +
        `The voices of many can conceal the simplest of secrets."`
      );
      onNext(); // move to next game
    } else {
      alert(`❌ Wrong! The answer was ${correct} words.\nHere’s another question...`);
      generateQuestion(); // generate new round
    }
  };

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
      {/* Mosquito Character */}
      <img
        src="/mosquito.png"
        alt="Mosquito"
        style={{
          width: "220px",
          marginBottom: "1.5rem",
          opacity: showControls ? 1 : 0,
          transition: "opacity 1s ease-in",
          animation: "buzz 0.2s infinite", // vibrating
        }}
      />

      {/* Mosquito Question */}
      <p
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          maxWidth: "700px",
          marginBottom: "1.5rem",
          opacity: showControls ? 1 : 0,
          transition: "opacity 1s ease-in",
        }}
      >
        {question}
      </p>

      {/* Controls */}
      <div
        style={{
          opacity: showControls ? 1 : 0,
          transition: "opacity 1s ease-in",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.8rem",
        }}
      >
        {/* Dropdown 5–15 */}
        <select
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
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
          <option value="">Select your answer...</option>
          {Array.from({ length: 11 }, (_, i) => i + 5).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {/* Confirm Button */}
        <button
          onClick={checkAnswer}
          disabled={!selectedAnswer}
          style={{
            padding: "0.6rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "2px solid #bb86fc",
            backgroundColor: selectedAnswer ? "#121212" : "#333",
            color: "#bb86fc",
            fontWeight: "bold",
            cursor: selectedAnswer ? "pointer" : "not-allowed",
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default GameTwo;
