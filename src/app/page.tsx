import Link from "next/link";
import { getAllCategories } from "@/lib/quiz";
import { RetroButton } from "@/components/ui/RetroButton";
import { RetroCard } from "@/components/ui/RetroCard";

export default function Home() {
  const categories = getAllCategories();

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      {/* CRT Monitor Frame / Hero */}
      <section className="crt-screen mx-auto max-w-2xl bg-retro-surface border-2 border-retro-border p-8 sm:p-12 text-center mb-12">
        <h1 className="text-4xl sm:text-5xl text-retro-primary text-glow cursor-blink">
          추억퀴즈
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-retro-text">
          90년대를 얼마나 기억하시나요?
        </p>
        <div className="mt-8">
          <Link href="/daily">
            <RetroButton variant="primary" size="lg">
              오늘의 퀴즈 시작!
            </RetroButton>
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="mx-auto max-w-5xl">
        <h2 className="text-2xl text-retro-accent text-center mb-8">
          카테고리 선택
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/quiz/${category.id}`}>
              <RetroCard
                glow
                className="h-full hover:border-retro-primary transition-colors duration-200 cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg text-retro-secondary mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-retro-muted leading-relaxed">
                  {category.description}
                </p>
              </RetroCard>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
