'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { lenisScrollTo } from '@/lib/lenis';

type WindowWithPendingHash = Window & {
  __pendingScrollHash?: string | null;
};

function getHeaderOffset() {
  // Prefer a real header element if present; fall back to a conservative default.
  const header = document.querySelector('header');
  if (header instanceof HTMLElement) {
    return header.getBoundingClientRect().height;
  }
  return 0;
}

let activeScrollRequest = 0;
let retryTimer: number | null = null;

function getPendingHash() {
  return (window as WindowWithPendingHash).__pendingScrollHash || null;
}

function scrollToHashWithRetry(hash: string, options: { pending?: boolean } = {}) {
  if (retryTimer !== null) {
    window.clearTimeout(retryTimer);
    retryTimer = null;
  }

  const requestId = ++activeScrollRequest;
  const id = hash.replace(/^#/, '');
  if (!id) return;

  // Extra margin from the top (in addition to header compensation).
  const extraMargin = 6;

  let attempt = 0;
  const maxAttempts = 10; // ~1s at 100ms interval

  const tick = () => {
    if (requestId !== activeScrollRequest) return;
    attempt += 1;

    const el = document.getElementById(id);
    if (el) {
      if (options.pending) {
        window.history.replaceState(null, '', `/#${id}`);
        (window as WindowWithPendingHash).__pendingScrollHash = null;
      }

      const offset = getHeaderOffset() + extraMargin;
      lenisScrollTo(el, offset);
      return;
    }

    if (attempt < maxAttempts) {
      retryTimer = window.setTimeout(tick, 100);
    }
  };

  tick();
}

export function HashScrollManager() {
  const pathname = usePathname();

  const runScroll = () => {
    const pendingHash = getPendingHash();
    if (pendingHash) {
      scrollToHashWithRetry(pendingHash, { pending: true });
      return;
    }

    const hash = window.location.hash;
    if (!hash) return;
    scrollToHashWithRetry(hash);
  };

  useEffect(() => {
    // 1) Handle hash after route navigation (e.g. /pricing -> /#about-us)
    // Wait a tick so the new page/sections are mounted, then retry until the element exists.
    const t = window.setTimeout(runScroll, 0);

    // Back/forward navigation can restore a hash without a pathname change.
    window.addEventListener('popstate', runScroll);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('popstate', runScroll);
    };
  }, [pathname]);

  useEffect(() => {
    // 2) Handle hash changes on the same route (e.g. clicking #faq while already on /)
    const onHashChange = () => runScroll();

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}

export {};


