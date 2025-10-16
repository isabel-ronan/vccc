import { useRef, useState } from "react";

export default function AudioButton({ src, label = "Play audio", position="left-bottom" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) el.pause();
    else el.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button
        className={`audio-fab ${position}`}
        onClick={toggle}
        aria-label={label}
        title={label}
      >
        {/* play/pause icon */}
        <span className="icon">{isPlaying ? "⏸" : "▶"}</span>
      </button>

      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />
    </>
  );
}
