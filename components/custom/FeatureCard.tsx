'use client';

import { ReactNode } from 'react';
import Card from '@/components/ui/Card';

interface FeatureCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function FeatureCard({ title, children, className = '' }: FeatureCardProps) {
  return (
    <Card hover={false} className={`aspect-square flex flex-col ${className}`}>
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        {children}
      </div>
      <div className="border-t border-neutral-gray/20 px-4 py-3 bg-neutral-light/50">
        <h3 className="text-center text-sm font-semibold text-neutral-dark">
          {title}
        </h3>
      </div>
    </Card>
  );
}

