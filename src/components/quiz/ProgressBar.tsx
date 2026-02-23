interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const filled = current;
  const empty = total - current;

  return (
    <div className="font-pixel text-retro-primary text-lg flex items-center gap-3">
      <span className="tracking-widest" aria-hidden="true">
        {"■".repeat(filled)}
        {"□".repeat(empty)}
      </span>
      <span className="text-retro-text text-sm">
        {current}/{total}
      </span>
    </div>
  );
}
