import { ButtonHTMLAttributes } from "react";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "win98" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function RetroButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: RetroButtonProps) {
  const base = "font-pixel transition-all duration-150 cursor-pointer";

  const variants = {
    primary:
      "bg-retro-primary text-retro-bg hover:brightness-110 active:brightness-90 border-2 border-retro-primary/50 text-glow",
    win98: "btn-win98",
    ghost:
      "bg-transparent text-retro-text border-2 border-retro-border hover:border-retro-primary hover:text-retro-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
