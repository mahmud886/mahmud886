'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/** A bento card that eases up into place the first time it scrolls into view. */
export default function Tile({
  children,
  className = '',
  delay = 0,
  as = 'div',
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'article' | 'section';
  id?: string;
}) {
  const M = motion[as];
  return (
    <M
      id={id}
      className={`tile ${className}`}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </M>
  );
}
