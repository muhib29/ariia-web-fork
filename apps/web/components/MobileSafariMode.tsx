'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type WindowWithPendingHash = Window & {
  __pendingScrollHash?: string | null;
};

/**
 * Mobile Safari: remount page content on route change so compositor state from a
 * previous page cannot blank the next one. Bloom/glow stays in each section TSX
 * (original positions + opacity) — not overridden in globals.css.
 */
export function MobileSafariMode({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if ((window as WindowWithPendingHash).__pendingScrollHash) return;

    window.scrollTo(0, 0);
  }, [pathname]);

  return <div>{children}</div>;
}
