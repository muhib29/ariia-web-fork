import Image from 'next/image';

interface AriiaSvgMarkProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function AriiaSvgMark({
  className = '',
  width = 127,
  height = 36,
  priority = false,
}: AriiaSvgMarkProps) {
  return (
    <Image
      src="/images/logo-desktop.webp"
      alt="ARIIA"
      width={width}
      height={height}
      priority={priority}
      className={`block object-contain ${className}`}
      style={{
        width,
        height,
        maxWidth: '100%',
      }}
    />
  );
}

// import Image from 'next/image';

// interface AriiaSvgMarkProps {
//   className?: string;
//   width?: number;
//   height?: number;
//   priority?: boolean;
// }

// /** Header wordmark — static asset instead of embedded raster in SVG. */
// export function AriiaSvgMark({
//   className = '',
//   width = 127,
//   height = 36,
//   priority = false,
// }: AriiaSvgMarkProps) {
//   return (
//     <Image
//       src="/images/headerlogo.webp"
//       alt="ARIIA"
//       width={width}
//       height={height}
//       priority={priority}
//       className={className}
//     />
//   );
// }
