'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { getLenis, registerLenis, unregisterLenis } from '@/lib/lenis';
import { shouldUseSmoothScroll } from '@/lib/device-capabilities';

type WindowWithPendingHash = Window & {
  __pendingScrollHash?: string | null;
};

export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!shouldUseSmoothScroll()) return;

    let cancelled = false;
    let rafId = 0;
    let removePointerListener: (() => void) | null = null;
    let destroyLenis: (() => void) | null = null;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled || !shouldUseSmoothScroll()) return;

      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
      });

      registerLenis(lenis);

      const stopInertiaForLinkPress = (event: PointerEvent) => {
        if (event.button !== 0 || !(event.target instanceof Element)) return;
        const link = event.target.closest('a[href]');
        if (!link) return;
        lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true });
      };

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      document.addEventListener('pointerdown', stopInertiaForLinkPress, { capture: true });
      removePointerListener = () => {
        document.removeEventListener('pointerdown', stopInertiaForLinkPress, { capture: true });
      };

      rafId = window.requestAnimationFrame(raf);
      destroyLenis = () => {
        window.cancelAnimationFrame(rafId);
        unregisterLenis(lenis);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      removePointerListener?.();
      destroyLenis?.();
    };
  }, []);

  // Reset Lenis on route change
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !window.location.hash &&
      !(window as WindowWithPendingHash).__pendingScrollHash
    ) {
      const timeout = window.setTimeout(() => {
        if ((window as WindowWithPendingHash).__pendingScrollHash) return;

        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      }, 100);

      return () => window.clearTimeout(timeout);
    }
  }, [pathname]);

  return <>{children}</>;
}
