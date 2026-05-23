'use client';

import { useConserveMemory } from '@/hooks/useConserveMemory';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type ViewportSectionProps = {
  children: React.ReactNode;
  estimatedHeight: number;
  id?: string;
  className?: string;
  rootMargin?: string;
};

function isNearViewport(rect: DOMRectReadOnly, vh: number): boolean {
  return rect.top < vh * 1.5 && rect.bottom > -vh * 0.6;
}

function isFarOffScreen(rect: DOMRectReadOnly, vh: number): boolean {
  return rect.bottom < -vh * 1.2 || rect.top > vh * 2;
}

/**
 * Low-RAM phones: mount section DOM only when near the viewport, unmount when far
 * to free memory. Other devices render the full section immediately.
 */
export function ViewportSection({
  children,
  estimatedHeight,
  id,
  className = '',
  rootMargin = '70% 0px',
}: ViewportSectionProps) {
  const conserve = useConserveMemory();
  const rootRef = useRef<HTMLDivElement>(null);
  const heightCache = useRef(estimatedHeight);
  const [active, setActive] = useState(true);

  const rememberHeight = useCallback(() => {
    const node = rootRef.current;
    if (!node) return;
    const h = node.offsetHeight;
    if (h > 80) heightCache.current = h;
  }, []);

  useLayoutEffect(() => {
    if (!conserve) return;
    const node = rootRef.current;
    if (!node) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = node.getBoundingClientRect();
    if (!isNearViewport(rect, vh)) setActive(false);
  }, [conserve]);

  useEffect(() => {
    if (!conserve) {
      setActive(true);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const updateActive = (next: boolean) => {
      setActive((prev) => {
        if (!next && prev) rememberHeight();
        return next;
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const vh = window.innerHeight || document.documentElement.clientHeight;

        if (entry.isIntersecting) {
          updateActive(true);
          return;
        }

        if (isFarOffScreen(entry.boundingClientRect, vh)) {
          updateActive(false);
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    updateActive(isNearViewport(rect, vh));

    return () => observer.disconnect();
  }, [conserve, rootMargin, rememberHeight]);

  useEffect(() => {
    if (!active || !conserve) return;
    const content = rootRef.current?.querySelector('[data-viewport-section-content]');
    if (!content || !(content instanceof HTMLElement)) return;

    const ro = new ResizeObserver(() => rememberHeight());
    ro.observe(content);
    return () => ro.disconnect();
  }, [active, conserve, rememberHeight]);

  if (!conserve) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  const minH = active ? undefined : heightCache.current;

  return (
    <div
      ref={rootRef}
      id={id}
      className={className}
      style={minH ? { minHeight: minH } : undefined}
    >
      {active ? (
        <div data-viewport-section-content>{children}</div>
      ) : (
        <div className="viewport-section-slot bg-white" style={{ minHeight: minH }} aria-hidden />
      )}
    </div>
  );
}
