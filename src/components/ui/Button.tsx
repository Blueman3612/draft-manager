import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:scale-100 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] active:shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-b from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-blue-500',
        destructive: 'bg-gradient-to-b from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-red-500',
        outline: 'border-2 border-gray-200 bg-gradient-to-b from-white to-gray-50 text-gray-700 hover:from-gray-50 hover:to-gray-100 hover:border-gray-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-gray-500',
        secondary: 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-gray-500',
        ghost: 'text-gray-700 hover:bg-gradient-to-b hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 rounded-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-gray-500',
        link: 'text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 focus-visible:ring-blue-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 