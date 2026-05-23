'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { isTouchDevice } from '@/lib/device-capabilities';

type DeferredImageProps = ImageProps & {
  rootMargin?: string;
};

function shouldEagerLoad(): boolean {
  if (typeof window === 'undefined') return false;
  return isTouchDevice() || window.matchMedia('(max-width: 767px)').matches;
}

/** Loads images when near viewport; eager on phones to avoid empty card areas while scrolling. */
export function DeferredImage({
  rootMargin = '500px 0px',
  alt,
  className,
  fill,
  style,
  ...props
}: DeferredImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shouldEagerLoad()) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (fill) {
    return (
      <div ref={ref} className={`relative ${className ?? ''}`} style={style}>
        {visible ? (
          <Image alt={alt} fill {...props} className="object-contain" loading="lazy" fetchPriority="low" />
        ) : (
          <div className="absolute inset-0 rounded-lg bg-slate-200/50 animate-pulse" aria-hidden />
        )}
      </div>
    );
  }

  return (
    <div ref={ref} style={style}>
      {visible ? (
        <Image alt={alt} className={className} {...props} loading="lazy" fetchPriority="low" />
      ) : (
        <div
          className={`${className ?? ''} min-h-[100px] bg-slate-200/50 animate-pulse rounded-lg`}
          aria-hidden
        />
      )}
    </div>
  );
}
