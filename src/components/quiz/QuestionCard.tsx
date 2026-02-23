import Image from "next/image";
import { RetroCard } from "@/components/ui/RetroCard";
import { AnswerButton } from "./AnswerButton";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  imageUrl?: string;
  choices: string[];
  onAnswer: (index: number) => void;
  disabled: boolean;
  answerState: number | null;
  correctIndex: number;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  imageUrl,
  choices,
  onAnswer,
  disabled,
  answerState,
  correctIndex,
}: QuestionCardProps) {
  function getButtonState(index: number): "idle" | "correct" | "incorrect" {
    if (answerState === null) return "idle";
    if (index === correctIndex) return "correct";
    if (index === answerState) return "incorrect";
    return "idle";
  }

  return (
    <RetroCard glow className="w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <span className="text-retro-accent text-sm">
          Q{questionNumber}/{totalQuestions}
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl text-retro-text leading-relaxed mb-6">
        {question}
      </h2>

      {imageUrl && (
        <div className="relative w-full aspect-video mb-6 border-2 border-retro-border rounded overflow-hidden">
          <Image
            src={imageUrl}
            alt="퀴즈 이미지"
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        {choices.map((choice, index) => (
          <AnswerButton
            key={index}
            label={`${index + 1}. ${choice}`}
            onClick={() => onAnswer(index)}
            disabled={disabled}
            state={getButtonState(index)}
          />
        ))}
      </div>
    </RetroCard>
  );
}
