'use client';

/**
 * Passthrough wrapper — scroll fade animations caused iOS white-screen / dead-click bugs.
 * Children render immediately with no opacity/transform (same visible UI as animation end-state).
 */
interface FadeInWhenInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
  immediate?: boolean;
}

export function FadeInWhenInView({
  children,
  className = '',
}: FadeInWhenInViewProps) {
  if (!className) {
    return <>{children}</>;
  }
  return <div className={className}>{children}</div>;
}
