'use client';

import type Lenis from 'lenis';
import { shouldUseSmoothScroll } from './device-capabilities';

let activeLenis: Lenis | null = null;

export function registerLenis(instance: Lenis) {
  activeLenis = instance;
}

export function unregisterLenis(instance: Lenis) {
  if (activeLenis === instance) {
    activeLenis = null;
  }
}

export function getLenis() {
  return activeLenis;
}

export function lenisScrollTo(
  target: string | number | HTMLElement,
  offset = 0,
  options: { immediate?: boolean } = {},
) {
  const useSmooth = shouldUseSmoothScroll();
  const behavior = useSmooth && !options.immediate ? 'smooth' : 'auto';

  if (activeLenis && useSmooth) {
    activeLenis.scrollTo(target as Parameters<Lenis['scrollTo']>[0], {
      offset: -offset,
      immediate: options.immediate,
      duration: 1.1,
    });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target - offset, behavior });
    return;
  }

  if (typeof target === 'string') {
    const element = document.querySelector<HTMLElement>(target);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior });
    }
    return;
  }

  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior });
}

