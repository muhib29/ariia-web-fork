'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { shouldConserveMemory } from '@/lib/device-capabilities';

/**
 * Mobile Safari: strip GPU-heavy blurs/masks site-wide and remount page content on
 * route change so compositor state from a previous page cannot blank the next one.
 */
export function MobileSafariMode({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      if (shouldConserveMemory()) {
        root.classList.add('ios-safe-mode');
      } else {
        root.classList.remove('ios-safe-mode');
      }
    };
    apply();

    const mq = window.matchMedia('(max-width: 767px)');
    mq.addEventListener('change', apply);
    window.addEventListener('orientationchange', apply);

    return () => {
      mq.removeEventListener('change', apply);
      window.removeEventListener('orientationchange', apply);
      root.classList.remove('ios-safe-mode');
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div key={pathname}>{children}</div>;
}
