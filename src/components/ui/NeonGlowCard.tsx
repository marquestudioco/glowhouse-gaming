import { cn } from '@/lib/utils/cn';

interface NeonGlowCardProps {
  children: React.ReactNode;
  accentColor?: 'cyan' | 'magenta' | 'violet';
  className?: string;
  as?: React.ElementType;
}

export function NeonGlowCard({
  children,
  accentColor = 'cyan',
  className,
  as: Tag = 'div',
}: NeonGlowCardProps) {
  const glowClass = {
    cyan:    'hover:border-[var(--neon-cyan)]    hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]',
    magenta: 'hover:border-[var(--neon-magenta)] hover:shadow-[0_0_20px_rgba(255,46,147,0.2)]',
    violet:  'hover:border-[var(--neon-violet)]  hover:shadow-[0_0_20px_rgba(123,44,191,0.2)]',
  }[accentColor];

  return (
    <Tag
      className={cn(
        'rounded-2xl border border-white/5 bg-[var(--bg-elevated)] transition-all duration-300',
        glowClass,
        className
      )}
    >
      {children}
    </Tag>
  );
}
