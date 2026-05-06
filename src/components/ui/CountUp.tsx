'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function CountUp({ end, suffix = '', prefix = '', duration = 1800 }: CountUpProps) {
  const [value, setValue]   = useState(0);
  const containerRef        = useRef<HTMLSpanElement>(null);
  const startedRef          = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || startedRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={containerRef}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
