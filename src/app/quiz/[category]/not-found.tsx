import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="crt-screen bg-retro-surface border-2 border-retro-border p-8 sm:p-12 text-center max-w-md w-full">
        <h1 className="text-4xl text-retro-primary text-glow font-pixel">
          ???
        </h1>
        <p className="mt-6 text-lg text-retro-text">
          카테고리를 찾을 수 없습니다
        </p>
        <p className="mt-2 text-sm text-retro-muted">
          존재하지 않는 퀴즈 카테고리입니다.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block font-pixel bg-retro-primary text-retro-bg hover:brightness-110 active:brightness-90 border-2 border-retro-primary/50 text-glow px-6 py-3 text-base transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-retro-primary"
          >
            다른 퀴즈 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
