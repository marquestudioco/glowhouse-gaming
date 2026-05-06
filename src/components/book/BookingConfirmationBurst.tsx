'use client';

import { useEffect, useRef } from 'react';

const PARTICLES = ['🎮','🎉','✨','🕹️','🎂','💜','⚡','🎊'];

export function BookingConfirmationBurst({ eventName }: { eventName: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: canvas.width  / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 14 - 4,
      emoji: PARTICLES[Math.floor(Math.random() * PARTICLES.length)],
      life: 1,
      decay: 0.01 + Math.random() * 0.01,
      size: 20 + Math.random() * 20,
    }));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.life -= p.decay;
        if (p.life > 0) {
          alive = true;
          ctx.globalAlpha = p.life;
          ctx.font = `${p.size}px serif`;
          ctx.fillText(p.emoji, p.x, p.y);
        }
      });
      ctx.globalAlpha = 1;
      if (alive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center" style={{ background: 'rgba(10,6,18,0.92)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 text-center px-6">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="font-display font-bold text-3xl italic mb-2" style={{ fontFamily: 'var(--font-clash), Georgia, serif', color: 'var(--neon-cyan)' }}>
          You're all set, {eventName}!
        </h2>
        <p className="text-[var(--text-dim)] mb-1">We'll confirm your booking within 24 hours.</p>
        <p className="text-sm text-[var(--text-dim)]">Check your email for a confirmation.</p>
      </div>
    </div>
  );
}
