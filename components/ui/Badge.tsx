import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'warm';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  
  const variants = {
    default: 'bg-neutral-light text-neutral-dark',
    warm: 'bg-warm-peach text-warm-orange',
  };
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

