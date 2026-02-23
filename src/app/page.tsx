import type { Metadata } from "next";
import Link from "next/link";
import { getAllCategories } from "@/lib/quiz";
import { RetroCard } from "@/components/ui/RetroCard";

export const metadata: Metadata = {
  openGraph: {
    images: ["/api/og?score=90&category=&level=%EC%B6%94%EC%96%B5%ED%80%B4%EC%A6%88"],
  },
};

export default function Home() {
  const categories = getAllCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "추억퀴즈",
    description: "90년대~2000년대 한국 문화 퀴즈",
    applicationCategory: "Game",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* CRT Monitor Frame / Hero */}
      <section className="crt-screen mx-auto max-w-2xl bg-retro-surface border-2 border-retro-border p-8 sm:p-12 text-center mb-12">
        <h1 className="text-4xl sm:text-5xl text-retro-primary text-glow cursor-blink">
          추억퀴즈
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-retro-text">
          90년대를 얼마나 기억하시나요?
        </p>
        <div className="mt-8">
          <Link
            href="/daily"
            className="inline-block font-pixel bg-retro-primary text-retro-bg hover:brightness-110 active:brightness-90 border-2 border-retro-primary/50 text-glow px-8 py-4 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-retro-primary transition-all duration-150"
          >
            오늘의 퀴즈 시작!
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
            <Link
              key={category.id}
              href={`/quiz/${category.id}`}
              className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-retro-primary rounded-lg"
            >
              <RetroCard
                glow
                className="h-full hover:border-retro-primary transition-colors duration-200 cursor-pointer"
              >
                <span aria-hidden="true" className="text-4xl mb-3 block">{category.icon}</span>
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
