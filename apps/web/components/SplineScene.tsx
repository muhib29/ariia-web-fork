'use client';

import { useState, CSSProperties, useEffect, useRef } from 'react';
import type { SplineSceneConfig } from '@/config/spline-scenes';
import type { Application } from '@splinetool/runtime';
import { useScreenSize } from '@/hooks/useScreenSize';
import { releaseSplineSlot, requestSplineSlot } from '@/lib/spline-loader';
import { SplineStaticPlaceholder } from './SplineStaticPlaceholder';

const MOBILE_SPLINE_DELAY = 4500;
const MOBILE_SPLINE_IDLE_TIMEOUT = 5000;

interface SplineSceneProps {
  config: SplineSceneConfig;
  className?: string;
  style?: CSSProperties;
  onLoad?: (spline: Application) => void;
  priority?: boolean;
  loadOnMount?: boolean;
  loadOnMountDelay?: number;
}

export default function SplineScene({
  config,
  className = '',
  style = {},
  onLoad,
  priority = false,
  loadOnMount = false,
  loadOnMountDelay = 0,
}: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineViewerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<Application | null>(null);
  const screenSize = useScreenSize();
  const currentHeight = config.height[screenSize];
  const shouldLoadImmediately = priority || config.priority || loadOnMount;
  const [isNearViewport, setIsNearViewport] = useState(shouldLoadImmediately);

  useEffect(() => {
    if (shouldLoadImmediately) {
      setIsNearViewport(true);
    }
  }, [shouldLoadImmediately]);

  // Viewport detection
  useEffect(() => {
    if (shouldLoadImmediately || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoadImmediately]);

  useEffect(() => {
    const onPause = () => {
      try { splineAppRef.current?.stop?.(); } catch (e) { }
      if (splineViewerRef.current) {
        splineViewerRef.current.style.visibility = 'hidden';
        splineViewerRef.current.style.pointerEvents = 'none';
      }
    };

    const onResume = () => {
      try { splineAppRef.current?.play?.(); } catch (e) { }
      if (splineViewerRef.current) {
        splineViewerRef.current.style.visibility = 'visible';
        splineViewerRef.current.style.pointerEvents = 'auto';
      }
    };

    window.addEventListener('spline-pause', onPause);
    window.addEventListener('spline-resume', onResume);

    return () => {
      window.removeEventListener('spline-pause', onPause);
      window.removeEventListener('spline-resume', onResume);
    };
  }, []);

  // Load Spline
  useEffect(() => {
    if (!isNearViewport) return;

    let cancelled = false;
    let loadListenerAdded = false;
    let slotHeld = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const load = () => {
      requestSplineSlot()
        .then(() => {
          if (cancelled) {
            releaseSplineSlot();
            return null;
          }
          slotHeld = true;
          return import('@splinetool/react-spline');
        })
        .then((mod) => {
          if (slotHeld) {
            releaseSplineSlot();
            slotHeld = false;
          }
          if (!mod) return;
          if (!cancelled) setSplineComponent(() => mod.default);
        })
        .catch((err) => {
          if (slotHeld) {
            releaseSplineSlot();
            slotHeld = false;
          }
          console.error('Failed to load Spline:', err);
          if (!cancelled) setError(true);
        });
    };

    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;

    const scheduleLoad = () => {
      const delay = loadOnMount ? loadOnMountDelay : shouldLoadImmediately ? 0 : 2500;
      const mobileDelay = Math.max(delay, MOBILE_SPLINE_DELAY);

      timeoutId = window.setTimeout(() => {
        if (cancelled) return;

        if (isMobileViewport && 'requestIdleCallback' in window) {
          idleId = window.requestIdleCallback(load, { timeout: MOBILE_SPLINE_IDLE_TIMEOUT });
          return;
        }

        if (isMobileViewport) {
          timeoutId = window.setTimeout(load, MOBILE_SPLINE_IDLE_TIMEOUT);
          return;
        }

        load();
      }, isMobileViewport ? mobileDelay : delay);
    };

    if (!isMobileViewport || document.readyState === 'complete') {
      scheduleLoad();
    } else {
      loadListenerAdded = true;
      window.addEventListener('load', scheduleLoad, { once: true });
    }

    return () => {
      cancelled = true;
      if (loadListenerAdded) window.removeEventListener('load', scheduleLoad);
      if (timeoutId) window.clearTimeout(timeoutId);
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (slotHeld) {
        releaseSplineSlot();
        slotHeld = false;
      }
    };
  }, [isNearViewport, shouldLoadImmediately, loadOnMount, loadOnMountDelay]);

  const handleLoad = (spline: Application) => {
    splineAppRef.current = spline;
    setIsLoaded(true);
    if (config.disableInteractions) {
      try {
        spline.setZoom(1);
        const canvas = document.querySelector(`[data-scene-id="${config.id}"] canvas`);
        if (canvas) (canvas as HTMLElement).style.pointerEvents = 'none';
      } catch (err) {
        console.warn('Could not disable interactions:', err);
      }
    }
    onLoad?.(spline);
  };

  const handleError = (err: Error) => {
    setError(true);
    console.error(`✗ Failed to load scene: ${config.id}`, err);
  };

  const containerStyle: CSSProperties = {
    width: '100%',
    height: currentHeight,
    position: 'relative',
    ...style,
  };

  const splineStyle: CSSProperties = {
    width: '100%',
    height: currentHeight,
    background: 'transparent',
    ...(config.disableInteractions && {
      pointerEvents: 'none',
      touchAction: 'none',
      userSelect: 'none',
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`spline-container ${className}`}
      style={containerStyle}
      data-scene-id={config.id}
    >
      {!SplineComponent && !error && (
        <SplineStaticPlaceholder config={config} fillParent className="absolute inset-0" />
      )}
      {!isLoaded && !error && SplineComponent && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', opacity: priority ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
          <div className="animate-spin h-6 w-6 border-3 border-primary/50 border-t-transparent rounded-full" />
        </div>
      )}
      {error && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fee', color: '#dc2626', gap: '12px' }}>
          <p>Unable to load 3D scene</p>
          <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Retry</button>
        </div>
      )}
      {SplineComponent && !error && (
        <div ref={splineViewerRef} style={splineStyle}>
          <SplineComponent scene={config.url} onLoad={handleLoad} onError={handleError} />
        </div>
      )}
    </div>
  );
}
