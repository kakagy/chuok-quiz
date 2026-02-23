export interface Question {
  id: string;
  text: string;
  type: "text" | "image";
  imageUrl?: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  year: number;
  difficulty: "easy" | "normal" | "hard";
}

export interface QuizPack {
  category: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  questionCount: number;
}

export interface QuizResult {
  category: string;
  score: number;
  totalQuestions: number;
  answers: { questionId: string; selectedIndex: number; correct: boolean }[];
  timestamp: number;
}

export interface ResultLevel {
  minScore: number;
  title: string;
  description: string;
  emoji: string;
}
