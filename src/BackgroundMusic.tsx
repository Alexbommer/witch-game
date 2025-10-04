import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const audio = audioRef.current;

    // Try autoplay
    audio.play().catch(() => {
      console.log("Waiting for user interaction to start music...");
    });

    // If autoplay blocked, start on first click
    const startOnClick = () => {
      if (audio.paused) {
        audio.play();
      }
      document.removeEventListener("click", startOnClick);
    };
    document.addEventListener("click", startOnClick);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
};

export default BackgroundMusic;
