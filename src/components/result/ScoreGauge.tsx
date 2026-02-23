"use client";

import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), score);
      setDisplayScore(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayScore(score);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-retro-muted text-sm">SCORE</span>
        <span className="text-3xl sm:text-4xl text-retro-primary text-glow font-pixel">
          {displayScore}%
        </span>
      </div>

      {/* Progress bar container */}
      <div className="w-full h-6 bg-retro-bg border-2 border-retro-border relative overflow-hidden">
        {/* Filled portion with pixel-art segmented look */}
        <div
          className="h-full bg-retro-primary transition-none relative"
          style={{ width: `${displayScore}%` }}
        >
          {/* Pixel-art segmented overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0px, transparent 6px, rgba(10,10,26,0.4) 6px, rgba(10,10,26,0.4) 8px)",
            }}
          />
        </div>

        {/* Scanline overlay on the bar */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          }}
        />
      </div>
    </div>
  );
}
