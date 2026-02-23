"use client";

interface AnswerButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
  state: "idle" | "correct" | "incorrect";
}

export function AnswerButton({ label, onClick, disabled, state }: AnswerButtonProps) {
  const stateClasses = {
    idle: "",
    correct: "!bg-green-600 !border-green-400 !text-white animate-pulse",
    incorrect: "!bg-red-600 !border-red-400 !text-white animate-pulse",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`btn-win98 font-pixel w-full text-left px-4 py-3 text-base transition-all duration-150 ${
        stateClasses[state]
      } ${
        disabled && state === "idle"
          ? "opacity-50 cursor-not-allowed"
          : disabled
            ? "cursor-not-allowed"
            : "hover:brightness-110 cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
}
