"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/types/quiz";
import { shuffleChoices, calculateScore } from "@/lib/quiz";
import { encodeResult } from "@/lib/share";
import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";

interface Answer {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

interface QuizPlayerProps {
  questions: Question[];
  category: string;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

export function QuizPlayer({ questions, category }: QuizPlayerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const question = questions[currentIndex];
  const seed = hashString(question.id);
  const { shuffled, correctIndex } = shuffleChoices(
    question.choices,
    question.correctIndex,
    seed
  );

  const handleAnswer = useCallback(
    (index: number) => {
      if (answered) return;

      const isCorrect = index === correctIndex;
      setSelectedIndex(index);
      setAnswered(true);

      const newAnswer: Answer = {
        questionId: question.id,
        selectedIndex: index,
        correct: isCorrect,
      };

      const updatedAnswers = [...answers, newAnswer];
      setAnswers(updatedAnswers);

      setTimeout(() => {
        if (currentIndex + 1 >= questions.length) {
          const score = calculateScore(updatedAnswers);
          const encoded = encodeResult({
            category,
            score,
            total: questions.length,
            date: new Date().toISOString().split("T")[0],
          });
          router.push(`/result/${encoded}`);
        } else {
          setCurrentIndex((prev) => prev + 1);
          setAnswered(false);
          setSelectedIndex(null);
        }
      }, 1500);
    },
    [answered, correctIndex, question.id, answers, currentIndex, questions.length, category, router]
  );

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex justify-center">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>

        <QuestionCard
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          question={question.text}
          imageUrl={question.imageUrl}
          choices={shuffled}
          onAnswer={handleAnswer}
          disabled={answered}
          answerState={selectedIndex}
          correctIndex={correctIndex}
        />

        {answered && (
          <div className="mt-6 max-w-2xl mx-auto text-center">
            <p className={`text-lg ${selectedIndex === correctIndex ? "text-green-400" : "text-red-400"}`}>
              {selectedIndex === correctIndex ? "정답!" : "오답!"}
            </p>
            <p className="text-retro-muted text-sm mt-2">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
