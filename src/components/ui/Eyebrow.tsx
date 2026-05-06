import { cn } from '@/lib/utils/cn';

interface EyebrowProps {
  children: React.ReactNode;
  color?: 'cyan' | 'magenta' | 'violet';
  className?: string;
}

export function Eyebrow({ children, color = 'cyan', className }: EyebrowProps) {
  const colorClass = {
    cyan:    'text-[var(--neon-cyan)]',
    magenta: 'text-[var(--neon-magenta)]',
    violet:  'text-[var(--neon-violet)]',
  }[color];
  return (
    <p className={cn('text-xs font-mono font-semibold uppercase tracking-[0.2em]', colorClass, className)}>
      {children}
    </p>
  );
}
