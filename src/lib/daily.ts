import type { Question } from "@/types/quiz";
import { getAllQuestions } from "./quiz";
import { shuffleArray } from "./random";

export function hashDate(dateString: string): number {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }
  return Math.abs(hash);
}

export function getDailyQuestions(dateString: string): Question[] {
  const allQuestions = getAllQuestions();
  const seed = hashDate(dateString);
  const shuffled = shuffleArray(allQuestions, seed);
  return shuffled.slice(0, 10);
}
