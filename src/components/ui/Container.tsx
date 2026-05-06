import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'narrow' | 'default' | 'wide';
  className?: string;
}

const sizes = {
  narrow:  'max-w-3xl',
  default: 'max-w-7xl',
  wide:    'max-w-[1400px]',
};

export function Container({ children, size = 'default', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}
