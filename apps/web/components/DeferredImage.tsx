'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';

type DeferredImageProps = ImageProps & {
  rootMargin?: string;
};

/** Loads images when near the viewport; keeps them mounted once loaded. */
export function DeferredImage({
  rootMargin = '400px 0px',
  alt,
  className,
  fill,
  style,
  sizes,
  ...props
}: DeferredImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loaded, rootMargin]);

  if (fill) {
    return (
      <div ref={ref} className={`relative ${className ?? ''}`} style={style}>
        {loaded ? (
          <Image
            alt={alt}
            fill
            sizes={sizes}
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
          sizes={sizes}
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
