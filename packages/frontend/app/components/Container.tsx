import { ReactNode } from "react";
import { cn } from "~/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(`px-2 md:px-4 max-w-6xl w-full mx-auto`, className)}>
      {children}
    </div>
  );
}
