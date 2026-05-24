'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Application } from '@splinetool/runtime';
import type { SplineSceneConfig } from '@/config/spline-scenes';
import { shouldLoadSpline } from '@/lib/device-capabilities';
import { whenPageInteractive } from '@/lib/when-page-interactive';
import { SplineStaticPlaceholder } from './SplineStaticPlaceholder';

const SplineSceneInner = dynamic(() => import('./SplineSceneInner'), { ssr: false });

export interface SplineSceneProps {
  config: SplineSceneConfig;
  className?: string;
  style?: CSSProperties;
  onLoad?: (spline: Application) => void;
  priority?: boolean;
  fillParent?: boolean;
}

/**
 * Desktop: static placeholder first, then Spline after load + idle (non-blocking).
 * Mobile / touch: static placeholder only — no WebGL.
 */
export default function SplineScene({
  config,
  className = '',
  style,
  onLoad,
  priority = false,
  fillParent = false,
}: SplineSceneProps) {
  const [allowSpline, setAllowSpline] = useState(false);
  const [readyToMountInner, setReadyToMountInner] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    const allowed = shouldLoadSpline();
    setAllowSpline(allowed);
    if (!allowed) return;

    return whenPageInteractive(() => setReadyToMountInner(true));
  }, []);

  const handleSceneReady = useCallback(() => {
    setSceneLoaded(true);
  }, []);

  if (!allowSpline) {
    return (
      <SplineStaticPlaceholder
        config={config}
        className={className}
        style={style}
        fillParent={fillParent}
      />
    );
  }

  const wrapperStyle: CSSProperties = fillParent
    ? { width: '100%', height: '100%', position: 'relative', ...style }
    : { position: 'relative', ...style };

  return (
    <div className={`relative ${className}`.trim()} style={wrapperStyle}>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          sceneLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        aria-hidden={sceneLoaded}
      >
        <SplineStaticPlaceholder config={config} fillParent={fillParent} />
      </div>

      {readyToMountInner && (
        <SplineSceneInner
          config={config}
          priority={priority}
          fillParent={fillParent}
          onLoad={onLoad}
          onSceneReady={handleSceneReady}
          className="absolute inset-0"
        />
      )}
    </div>
  );
}
