'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, icon, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset transition-all duration-200',
              'placeholder:text-gray-400 focus:ring-2 focus:ring-inset',
              'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
              icon ? 'pl-10' : 'pl-4',
              error
                ? 'ring-red-300 focus:ring-red-500 text-red-900 placeholder-red-300'
                : 'ring-gray-300 focus:ring-blue-500 text-gray-900',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput }; 