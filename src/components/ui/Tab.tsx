'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface TabProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Tab({ href, children, className }: TabProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'relative inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300',
        'hover:text-blue-600',
        'focus:outline-none',
        'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transform',
        'after:transition-all after:duration-300',
        isActive
          ? 'text-blue-600 after:bg-blue-600 after:scale-x-100'
          : 'text-gray-600 after:bg-blue-400 after:scale-x-0 hover:after:scale-x-100 hover:after:opacity-50',
        className
      )}
    >
      {children}
    </Link>
  );
} 