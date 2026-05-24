/** Run callback after window load + idle so work does not compete with first paint / TTI. */
export function whenPageInteractive(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  let cancelled = false;

  const run = () => {
    if (cancelled) return;

    const schedule =
      typeof requestIdleCallback === 'function'
        ? (fn: () => void) => requestIdleCallback(fn, { timeout: 2500 })
        : (fn: () => void) => window.setTimeout(fn, 200);

    schedule(() => {
      if (!cancelled) callback();
    });
  };

  if (document.readyState === 'complete') {
    run();
  } else {
    window.addEventListener('load', run, { once: true });
  }

  return () => {
    cancelled = true;
  };
}
