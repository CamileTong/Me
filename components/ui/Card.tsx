'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

