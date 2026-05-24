'use client';

import type { CSSProperties } from 'react';
import type { SplineSceneConfig } from '@/config/spline-scenes';
import { getSplineFallbackVariant } from '@/config/spline-scenes';
import { useScreenSize } from '@/hooks/useScreenSize';
import { SplineFallback } from './SplineFallback';

interface SplineStaticPlaceholderProps {
  config: SplineSceneConfig;
  className?: string;
  style?: CSSProperties;
  /** Fill a sized parent (e.g. hero orb circle) instead of config height. */
  fillParent?: boolean;
}

/** Static gradient stand-in — no Spline / WebGL bundle. */
export function SplineStaticPlaceholder({
  config,
  className = '',
  style = {},
  fillParent = false,
}: SplineStaticPlaceholderProps) {
  const screenSize = useScreenSize();
  const variant = getSplineFallbackVariant(config);

  const containerStyle: CSSProperties = fillParent
    ? { width: '100%', height: '100%', position: 'relative', ...style }
    : {
        width: '100%',
        height: config.height[screenSize],
        position: 'relative',
        ...style,
      };

  return (
    <div className={className} style={containerStyle} data-scene-id={config.id} aria-hidden>
      <SplineFallback variant={variant} className="absolute inset-0" />
    </div>
  );
}
