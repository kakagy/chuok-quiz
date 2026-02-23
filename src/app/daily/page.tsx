import type { Metadata } from "next";
import { getDailyQuestions } from "@/lib/daily";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";

export const metadata: Metadata = {
  title: "오늘의 추억퀴즈",
  description: "매일 새로운 추억퀴즈 10문제에 도전하세요!",
};

export const revalidate = 86400;

export default function DailyQuizPage() {
  const todayDateString = new Date().toISOString().split("T")[0];
  const dailyQuestions = getDailyQuestions(todayDateString);

  return <QuizPlayer questions={dailyQuestions} category="daily" />;
}
