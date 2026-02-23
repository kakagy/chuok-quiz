"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
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

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answersRef = useRef<Answer[]>([]);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const question = questions[currentIndex];

  const { shuffled, correctIndex } = useMemo(
    () => shuffleChoices(question.choices, question.correctIndex, hashString(question.id)),
    [question.id]
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

      answersRef.current = [...answersRef.current, newAnswer];
      const updatedAnswers = answersRef.current;
      setAnswers(updatedAnswers);

      timerRef.current = setTimeout(() => {
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
          requestAnimationFrame(() => {
            questionRef.current?.focus();
          });
        }
      }, 1500);
    },
    [answered, correctIndex, question.id, currentIndex, questions.length, category, router]
  );

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex justify-center">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>

        <div ref={questionRef} tabIndex={-1} className="outline-none">
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
        </div>

        <div role="status" aria-live="polite" className="mt-6 max-w-2xl mx-auto text-center">
          {answered && (
            <>
              <p className={`text-lg ${selectedIndex === correctIndex ? "text-green-400" : "text-red-400"}`}>
                {selectedIndex === correctIndex ? "정답!" : "오답!"}
              </p>
              <p className="text-retro-muted text-sm mt-2">
                {question.explanation}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
