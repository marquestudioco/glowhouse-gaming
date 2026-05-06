'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function RouteTransitionCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const prevPath   = useRef(pathname);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    const curtain = curtainRef.current;
    if (!curtain) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline();
    tl.fromTo(curtain,
      { y: '100%' },
      { y: '0%', duration: 0.35, ease: 'power3.out' }
    ).to(curtain,
      { y: '-100%', duration: 0.35, ease: 'power3.in', delay: 0.05 }
    ).set(curtain, { y: '100%' });
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      aria-hidden
      className="fixed inset-0 z-[90] pointer-events-none"
      style={{
        background: 'var(--bg-elevated)',
        transform: 'translateY(100%)',
      }}
    />
  );
}
