import { getResultLevel } from "@/lib/result-levels";
import { ScoreGauge } from "./ScoreGauge";

interface ResultCardProps {
  score: number;
  category: string;
  categoryTitle: string;
}

export function ResultCard({ score, category, categoryTitle }: ResultCardProps) {
  const level = getResultLevel(score);

  return (
    <div className="crt-screen bg-retro-surface border-2 border-retro-border p-6 sm:p-8">
      {/* Score Gauge */}
      <div className="mb-8">
        <ScoreGauge score={score} />
      </div>

      {/* Result Level */}
      <div className="text-center mb-6">
        <span className="text-5xl sm:text-6xl block mb-3" aria-hidden="true">
          {level.emoji}
        </span>
        <h2 className="text-2xl sm:text-3xl text-retro-secondary text-glow mb-3">
          {level.title}
        </h2>
        <p className="text-retro-muted text-sm sm:text-base leading-relaxed">
          {level.description}
        </p>
      </div>

      {/* Category */}
      <div className="text-center mb-6">
        <span className="text-retro-accent text-sm">
          [{categoryTitle}]
        </span>
      </div>

      {/* Score Text */}
      <p className="text-center text-lg sm:text-xl text-retro-primary text-glow">
        나는 90년대를 {score}% 기억한다!
      </p>
    </div>
  );
}
