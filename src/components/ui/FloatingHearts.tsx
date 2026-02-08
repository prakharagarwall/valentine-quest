'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

export default function FloatingHearts({ hearts }: { hearts: FloatingHeart[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.6, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: heart.delay,
          }}
          style={{
            position: 'absolute',
            fontSize: '2.25rem',
            color: 'rgba(251, 113, 133, 0.6)',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
