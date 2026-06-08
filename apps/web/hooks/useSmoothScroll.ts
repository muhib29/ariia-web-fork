'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export default function useSmoothScroll() {
  const router = useRouter();
  const currentPathname = usePathname();

  const scrollTo = useCallback(
    (
      href: string,
      options?: {
        hash?: string;
        offset?: number;
      },
    ) => {
      const { hash: optionHash, offset = 0 } = options || {};

      let targetPathname: string;
      let targetHash = '';

      if (optionHash) {
        targetPathname = href || '/';
        targetHash = optionHash;
      } else if (href.includes('#')) {
        const [path, hashPart] = href.split('#');
        targetPathname = path || '/';
        targetHash = hashPart;
      } else if (href.startsWith('#')) {
        targetPathname = currentPathname;
        targetHash = href.slice(1);
      } else {
        targetPathname = href;
      }

      const normalizedCurrent = currentPathname.replace(/\/$/, '') || '/';
      const normalizedTarget = targetPathname.replace(/\/$/, '') || '/';

      const isSamePage = normalizedCurrent === normalizedTarget;

      if (targetHash) {
        if (isSamePage) {
          const hashHref = `${targetPathname}#${targetHash}`;
          window.history.pushState(null, '', hashHref);
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        } else {
          const fullHref = targetHash ? `${targetPathname}#${targetHash}` : targetPathname;
          router.push(fullHref, { scroll: false });
          const expectedHash = `#${targetHash}`;
          let attempts = 0;

          const notifyHashReady = () => {
            attempts += 1;

            if (window.location.hash === expectedHash) {
              window.dispatchEvent(new HashChangeEvent('hashchange'));
              return;
            }

            if (attempts < 60) {
              window.setTimeout(notifyHashReady, 100);
            }
          };

          window.setTimeout(notifyHashReady, 0);
          // Scrolling is handled centrally (after route navigation) by HashScrollManager.
          // This avoids race conditions with route transitions and prevents scroll
          // logic from fighting with LenisProvider's route scroll behavior.
        }
      } else {
        router.push(href, { scroll: false });
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    },
    [router, currentPathname],
  );

  return { scrollTo };
}

