import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { decodeResult } from "@/lib/share";
import { getResultLevel } from "@/lib/result-levels";
import { getAllCategories } from "@/lib/quiz";
import { ResultCard } from "@/components/result/ResultCard";
import { ShareButtons } from "@/components/result/ShareButtons";
import { RetroButton } from "@/components/ui/RetroButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = decodeResult(id);
  if (!result) return { title: "추억퀴즈" };
  const level = getResultLevel(result.score);
  return {
    title: `${level.title} - 추억퀴즈`,
    description: `나는 90년대를 ${result.score}% 기억한다!`,
    openGraph: {
      images: [
        `/api/og?score=${result.score}&category=${result.category}&level=${encodeURIComponent(level.title)}`,
      ],
    },
  };
}

export default async function ResultPage({ params }: PageProps) {
  const { id } = await params;
  const result = decodeResult(id);

  if (!result) {
    notFound();
  }

  const categories = getAllCategories();
  const category = categories.find((c) => c.id === result.category);
  const categoryTitle = category?.title ?? result.category;

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/result/${id}`;

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Result Card */}
        <div className="mb-8">
          <ResultCard
            score={result.score}
            category={result.category}
            categoryTitle={categoryTitle}
          />
        </div>

        {/* Share Buttons */}
        <div className="mb-8">
          <h3 className="text-center text-retro-accent text-sm mb-4">
            결과 공유하기
          </h3>
          <ShareButtons score={result.score} shareUrl={shareUrl} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/quiz/${result.category}`}>
            <RetroButton variant="primary" size="lg" className="w-full sm:w-auto">
              다시 도전하기
            </RetroButton>
          </Link>
          <Link href="/">
            <RetroButton variant="ghost" size="lg" className="w-full sm:w-auto">
              다른 퀴즈 풀기
            </RetroButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
