'use client';

import Image, { type ImageProps } from 'next/image';
import { useConserveMemory } from '@/hooks/useConserveMemory';
import { useEffect, useRef, useState } from 'react';

type DeferredImageProps = ImageProps & {
  rootMargin?: string;
  /** When true (default), drop image from DOM once far off-screen on low-RAM devices. */
  unloadWhenHidden?: boolean;
};

function isFarOffScreen(rect: DOMRectReadOnly, vh: number): boolean {
  return rect.bottom < -vh * 0.75 || rect.top > vh * 1.25;
}

/**
 * Loads images near the viewport. On low-RAM phones, unloads decoded bitmaps when
 * scrolled away to reduce memory pressure (iOS WebKit eviction white screens).
 */
export function DeferredImage({
  rootMargin = '400px 0px',
  unloadWhenHidden = true,
  alt,
  className,
  fill,
  style,
  sizes,
  ...props
}: DeferredImageProps) {
  const conserve = useConserveMemory();
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const margin = conserve ? '180px 0px' : rootMargin;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!conserve) {
      const once = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setLoaded(true);
            once.disconnect();
          }
        },
        { rootMargin: margin, threshold: 0.01 },
      );
      once.observe(node);
      return () => once.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const vh = window.innerHeight || document.documentElement.clientHeight;

        if (entry.isIntersecting) {
          setLoaded(true);
          return;
        }

        if (unloadWhenHidden && isFarOffScreen(entry.boundingClientRect, vh)) {
          setLoaded(false);
        }
      },
      { rootMargin: margin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [conserve, margin, unloadWhenHidden]);

  const mobileSizes = conserve ? '(max-width: 767px) 90vw, 50vw' : sizes;

  if (fill) {
    return (
      <div ref={ref} className={`relative ${className ?? ''}`} style={style}>
        {loaded ? (
          <Image
            alt={alt}
            fill
            sizes={mobileSizes}
            {...props}
            className="object-contain"
            loading="lazy"
            fetchPriority="low"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-100/80" aria-hidden />
        )}
      </div>
    );
  }

  return (
    <div ref={ref} style={style}>
      {loaded ? (
        <Image
          alt={alt}
          className={className}
          sizes={mobileSizes}
          {...props}
          loading="lazy"
          fetchPriority="low"
        />
      ) : (
        <div
          className={`${className ?? ''} min-h-[80px] bg-slate-100/80 rounded-lg`}
          aria-hidden
        />
      )}
    </div>
  );
}
