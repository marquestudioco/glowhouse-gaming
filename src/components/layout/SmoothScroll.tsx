'use client';

import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia('(pointer: coarse)').matches);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.8,
        lerp: 0.06,
        wheelMultiplier: 0.8,
        smoothWheel: true,
        prevent: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      }}
    >
      {children}
    </ReactLenis>
  );
}
