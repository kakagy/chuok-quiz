import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuizPack } from "@/lib/quiz";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const pack = getQuizPack(category);
  if (!pack) {
    return { title: "카테고리를 찾을 수 없습니다" };
  }
  return {
    title: `${pack.title} - 추억퀴즈`,
    description: pack.description,
  };
}

export default async function QuizCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const pack = getQuizPack(category);

  if (!pack) {
    notFound();
  }

  return <QuizPlayer questions={pack.questions} category={category} />;
}
