import { ReactNode } from 'react';
import { cn } from '~/lib/utils';

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(`mx-auto w-full max-w-6xl px-2 md:px-4`, className)}>
      {children}
    </div>
  );
}
