export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="crt-screen bg-retro-surface border-2 border-retro-border p-12 text-center">
        <p className="text-2xl text-retro-primary text-glow cursor-blink">
          로딩 중...
        </p>
      </div>
    </div>
  );
}
