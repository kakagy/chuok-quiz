import { HTMLAttributes } from "react";

interface RetroCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function RetroCard({
  glow = false,
  className = "",
  children,
  ...props
}: RetroCardProps) {
  return (
    <div
      className={`bg-retro-surface border-2 border-retro-border rounded-lg p-6 ${
        glow ? "shadow-[0_0_15px_rgba(0,255,65,0.1)]" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
