'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function GlowTrailCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot   = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail) return;

    dot.style.display   = 'block';
    trail.style.display = 'block';

    const dotX   = gsap.quickTo(dot,   'x', { duration: 0.08, ease: 'power3.out' });
    const dotY   = gsap.quickTo(dot,   'y', { duration: 0.08, ease: 'power3.out' });
    const trailX = gsap.quickTo(trail, 'x', { duration: 0.25, ease: 'power3.out' });
    const trailY = gsap.quickTo(trail, 'y', { duration: 0.25, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX); dotY(e.clientY);
      trailX(e.clientX); trailY(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-magnetic]');
      if (el) {
        gsap.to(dot,   { scale: 2.5, duration: 0.2 });
        gsap.to(trail, { scale: 1.8, opacity: 0.9, duration: 0.3 });
      }
    };
    const onMouseOut = () => {
      gsap.to(dot,   { scale: 1, duration: 0.2 });
      gsap.to(trail, { scale: 1, opacity: 0.5, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout',  onMouseOut);

    // Track which elements have magnetic listeners to avoid rebinding
    const bound = new WeakSet<HTMLElement>();

    const bindEl = (el: HTMLElement) => {
      if (bound.has(el)) return;
      bound.add(el);
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width / 2;
        const cy   = rect.top  + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        if (dist < 80) {
          const pull = (1 - dist / 80) * 0.28;
          gsap.to(el, { x: (e.clientX - cx) * pull, y: (e.clientY - cy) * pull, duration: 0.3, ease: 'power2.out' });
        }
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      });
    };

    const bindAll = () => {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(bindEl);
    };

    bindAll();

    // Watch for newly added magnetic elements only — never modify DOM here
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        m.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            if (node.matches('[data-magnetic]')) bindEl(node);
            node.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(bindEl);
          }
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout',  onMouseOut);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          display: 'none',
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--neon-cyan)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: 'var(--glow-cyan)',
        }}
      />
      <div
        ref={trailRef}
        aria-hidden
        style={{
          display: 'none',
          position: 'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, rgba(255,46,147,0.2) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.5,
          filter: 'blur(6px)',
        }}
      />
    </>
  );
}
