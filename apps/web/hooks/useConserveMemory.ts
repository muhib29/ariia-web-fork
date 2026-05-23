'use client';

import { useEffect, useState } from 'react';
import { shouldConserveMemory } from '@/lib/device-capabilities';

/** True on low-RAM phones (e.g. iPhone X) after mount — gates lazy sections & image unload. */
export function useConserveMemory(): boolean {
  const [conserve, setConserve] = useState(false);

  useEffect(() => {
    setConserve(shouldConserveMemory());
  }, []);

  return conserve;
}
