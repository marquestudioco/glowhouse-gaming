import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Shield, Users, Trophy, BookOpen, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { CtaBand }   from '@/components/home/CtaBand';
import { TestimonialMarquee } from '@/components/home/TestimonialMarquee';

export const metadata: Metadata = {
  title: 'After School Club',
  description: 'Glowhouse Gaming After School Club in Santa Clarita — safe, supervised, and seriously fun. Mon–Fri program for school-age kids.',
};

const FEATURES = [
  {
    icon: Shield,
    title: 'Safe & Supervised',
    desc: 'Trained staff on-site at all times. We communicate with parents throughout the session.',
    color: 'var(--neon-cyan)',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    desc: 'Monday through Friday, afternoon sessions fit perfectly with school dismissal times.',
    color: 'var(--neon-magenta)',
  },
  {
    icon: BookOpen,
    title: 'Homework Time',
    desc: 'Dedicated quiet time for homework and study before gaming sessions begin.',
    color: 'var(--neon-violet)',
  },
  {
    icon: Trophy,
    title: 'Structured Play',
    desc: 'Curated gaming sessions with age-appropriate content and friendly competitions.',
    color: 'var(--neon-cyan)',
  },
  {
    icon: Users,
    title: 'Small Groups',
    desc: 'Capped enrollment ensures every kid gets attention and makes real friendships.',
    color: 'var(--neon-magenta)',
  },
  {
    icon: Star,
    title: 'All Skill Levels',
    desc: 'Whether they\'re casual players or future pros, every kid fits in here.',
    color: 'var(--neon-violet)',
  },
];

const SCHEDULE = [
  { time: '2:30 PM', label: 'Doors open — snacks & check-in' },
  { time: '2:45 PM', label: 'Homework / quiet study time' },
  { time: '3:30 PM', label: 'Gaming session begins' },
  { time: '4:30 PM', label: 'Structured tournament / team play' },
  { time: '5:30 PM', label: 'Wrap-up, cool-down, parent pickup' },
];

export default function AfterSchoolClubPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-clip" style={{ background: 'var(--bg-deep)' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 40%, rgba(123,44,191,0.1) 0%, transparent 65%)' }} />

        <Container size="narrow">
          <div className="text-center">
            <Eyebrow color="violet" className="mb-4">After School Club</Eyebrow>
            <h1
              className="font-display font-bold italic mb-6"
              style={{
                fontSize: 'var(--text-display)',
                fontFamily: "'Clash Display', Georgia, serif",
                textShadow: '0 0 40px rgba(123,44,191,0.4)',
              }}
            >
              The best part of their school day
            </h1>
            <p className="text-[var(--text-dim)] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Structured after-school gaming Mon–Fri. Safe, supervised, and seriously fun for school-age kids in Santa Clarita. Homework first, gaming second — in the best possible way.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://www.ghgafterschoolclub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--neon-violet), var(--neon-magenta))',
                  boxShadow: '0 0 30px rgba(123,44,191,0.3)',
                }}
                data-magnetic
              >
                Enroll at ghgafterschoolclub.com →
              </a>
              <a
                href="tel:+18553484569"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border border-white/15 text-[var(--text-dim)] hover:text-[var(--text-light)] hover:border-white/30 transition-all"
              >
                Call (855) 348-4569
              </a>
            </div>
            <p className="text-xs text-[var(--text-dim)] mt-4">
              Enrollment, schedules, and pricing at ghgafterschoolclub.com
            </p>
          </div>
        </Container>
      </section>

      {/* Features grid */}
      <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
        <Container>
          <div className="text-center mb-14">
            <Eyebrow color="violet" className="mb-3">What We Offer</Eyebrow>
            <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: "'Clash Display', Georgia, serif" }}>
              More than just gaming
            </h2>
            <p className="text-[var(--text-dim)] mt-3 max-w-lg mx-auto">
              We've designed a program parents trust and kids love coming back to every week.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 rounded-2xl border border-white/5 bg-[var(--bg-deep)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: color + '15' }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="font-bold text-[var(--text-light)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Daily schedule */}
      <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
        <Container size="narrow">
          <div className="text-center mb-12">
            <Eyebrow color="magenta" className="mb-3">Daily Schedule</Eyebrow>
            <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: "'Clash Display', Georgia, serif" }}>
              What a typical day looks like
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-white/5" aria-hidden />
            <div className="space-y-0">
              {SCHEDULE.map(({ time, label }, i) => (
                <div key={time} className="flex gap-6 items-start py-5 border-b border-white/5 last:border-0">
                  <div className="shrink-0 w-[64px] text-right">
                    <span className="text-xs font-mono font-semibold" style={{ color: i === 2 ? 'var(--neon-violet)' : 'var(--text-dim)' }}>
                      {time}
                    </span>
                  </div>
                  <div
                    className="shrink-0 w-3 h-3 rounded-full mt-0.5 relative z-10"
                    style={{ background: i === 2 ? 'var(--neon-violet)' : 'rgba(255,255,255,0.15)', boxShadow: i === 2 ? '0 0 8px var(--neon-violet)' : undefined }}
                  />
                  <p className="text-sm text-[var(--text-light)] leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-[var(--text-dim)] text-center mt-6">
            Schedule may vary slightly. Check ghgafterschoolclub.com for current details.
          </p>
        </Container>
      </section>

      {/* CTA to external site */}
      <section className="py-16" style={{ background: 'var(--bg-elevated)' }}>
        <Container size="narrow">
          <div className="text-center p-8 rounded-2xl border border-white/5" style={{ background: 'var(--bg-deep)' }}>
            <div className="text-4xl mb-4" aria-hidden>🎮</div>
            <h3 className="font-bold text-xl text-[var(--text-light)] mb-3">Ready to enroll?</h3>
            <p className="text-[var(--text-dim)] text-sm mb-6 max-w-sm mx-auto">
              Visit our dedicated After School Club site for enrollment, current pricing, and available spots.
            </p>
            <a
              href="https://www.ghgafterschoolclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--neon-violet), var(--neon-magenta))',
                boxShadow: '0 0 20px rgba(123,44,191,0.3)',
              }}
              data-magnetic
            >
              Visit ghgafterschoolclub.com →
            </a>
          </div>
        </Container>
      </section>

      <TestimonialMarquee />
      <CtaBand />
    </>
  );
}
