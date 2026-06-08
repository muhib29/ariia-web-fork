'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { lenisScrollTo } from '@/lib/lenis';

const PENDING_HASH_KEY = 'ariia:pending-home-hash';

function getHeaderOffset() {
  // Prefer a real header element if present; fall back to a conservative default.
  const header = document.querySelector('header');
  if (header instanceof HTMLElement) {
    return header.getBoundingClientRect().height;
  }
  return 0;
}

let activeScrollRequest = 0;

function getPendingHash() {
  return window.sessionStorage.getItem(PENDING_HASH_KEY);
}

function scrollToHashWithRetry(hash: string, options: { pending?: boolean } = {}) {
  const requestId = ++activeScrollRequest;
  const id = hash.replace(/^#/, '');
  if (!id) return;

  // Extra margin from the top (in addition to header compensation).
  const extraMargin = 6;

  let attempt = 0;
  const maxAttempts = 100; // ~10s at 100ms interval for slow below-fold chunks/data

  const tick = () => {
    if (requestId !== activeScrollRequest) return;
    attempt += 1;

    const el = document.getElementById(id);
    if (el) {
      if (options.pending) {
        window.sessionStorage.removeItem(PENDING_HASH_KEY);
        window.history.pushState(null, '', `/#${id}`);
      }

      const offset = getHeaderOffset() + extraMargin;
      lenisScrollTo(el, offset);
      return;
    }

    if (attempt < maxAttempts) {
      window.setTimeout(tick, 100);
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


