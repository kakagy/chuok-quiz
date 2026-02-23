import type { Metadata } from "next";
import { getDailyQuestions } from "@/lib/daily";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";

export const metadata: Metadata = {
  title: "오늘의 추억퀴즈",
  description: "매일 새로운 추억퀴즈 10문제에 도전하세요! 6개 카테고리에서 랜덤으로 출제되는 오늘의 문제를 풀어보세요.",
  openGraph: {
    images: ["/api/og?score=90&category=daily&level=%EC%98%A4%EB%8A%98%EC%9D%98%20%ED%80%B4%EC%A6%88"],
  },
};

export const revalidate = 86400;

export default function DailyQuizPage() {
  const todayDateString = new Date().toISOString().split("T")[0];
  const dailyQuestions = getDailyQuestions(todayDateString);

  return <QuizPlayer questions={dailyQuestions} category="daily" />;
}
