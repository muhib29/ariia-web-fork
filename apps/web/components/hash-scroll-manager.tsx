'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { lenisScrollTo } from '@/lib/lenis';

let activeHashRetryTimer: number | null = null;
let lastCompletedScrollKey = '';
let lastCompletedAt = 0;

function getHeaderOffset() {
  // Prefer a real header element if present; fall back to a conservative default.
  const header = document.querySelector('header');
  if (header instanceof HTMLElement) {
    return header.getBoundingClientRect().height;
  }
  return 0;
}

function clearActiveHashRetry() {
  if (activeHashRetryTimer !== null) {
    window.clearTimeout(activeHashRetryTimer);
    activeHashRetryTimer = null;
  }
}

function scrollToHashWithRetry(hash: string) {
  const id = hash.replace(/^#/, '');
  if (!id) return;

  const scrollKey = `${window.location.pathname}#${id}`;
  const now = performance.now();
  if (lastCompletedScrollKey === scrollKey && now - lastCompletedAt < 750) {
    return;
  }

  clearActiveHashRetry();

  // Extra margin from the top (in addition to header compensation).
  const extraMargin = 6;

  let attempt = 0;
  const maxAttempts = 30; // ~3s at 100ms interval

  const tick = () => {
    attempt += 1;

    const el = document.getElementById(id);
    if (el) {
      const offset = getHeaderOffset() + extraMargin;
      lastCompletedScrollKey = scrollKey;
      lastCompletedAt = performance.now();
      lenisScrollTo(el, offset);
      return;
    }

    if (attempt < maxAttempts) {
      activeHashRetryTimer = window.setTimeout(tick, 100);
    }
  };

  tick();
}

export function HashScrollManager() {
  const pathname = usePathname();

  const runScroll = () => {
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
      clearActiveHashRetry();
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


