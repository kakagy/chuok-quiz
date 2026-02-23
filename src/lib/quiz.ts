import type { Question, QuizPack, Category } from "@/types/quiz";
import categoriesData from "@/data/categories.json";
import gamesData from "@/data/quizzes/games.json";
import kpopData from "@/data/quizzes/kpop.json";
import animeData from "@/data/quizzes/anime.json";
import tvData from "@/data/quizzes/tv.json";
import toysData from "@/data/quizzes/toys.json";
import schoolData from "@/data/quizzes/school.json";

const quizPacks: Record<string, QuizPack> = {
  games: gamesData as QuizPack,
  kpop: kpopData as QuizPack,
  anime: animeData as QuizPack,
  tv: tvData as QuizPack,
  toys: toysData as QuizPack,
  school: schoolData as QuizPack,
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function shuffleChoices(
  choices: string[],
  seed: number
): { shuffled: string[]; correctIndex: number } {
  const rand = seededRandom(seed);
  const indexed = choices.map((c, i) => ({ choice: c, originalIndex: i }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const correctIndex = indexed.findIndex((item) => item.originalIndex === 0);
  return { shuffled: indexed.map((item) => item.choice), correctIndex };
}

export function calculateScore(answers: { correct: boolean }[]): number {
  if (answers.length === 0) return 0;
  const correct = answers.filter((a) => a.correct).length;
  return Math.round((correct / answers.length) * 100);
}

export function getQuizPack(category: string): QuizPack | undefined {
  return quizPacks[category];
}

export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function getAllQuestions(): Question[] {
  return Object.values(quizPacks).flatMap((pack) => pack.questions);
}
