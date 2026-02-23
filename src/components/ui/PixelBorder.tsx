import { HTMLAttributes } from "react";

export function PixelBorder({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`pixel-border p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
