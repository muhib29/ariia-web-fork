import Image from 'next/image';

interface AriiaSvgMarkProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/** Header wordmark — static asset instead of embedded raster in SVG. */
export function AriiaSvgMark({
  className = '',
  width = 127,
  height = 36,
  priority = false,
}: AriiaSvgMarkProps) {
  return (
    <Image
      src="/images/headerlogo.png"
      alt="ARIIA"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
