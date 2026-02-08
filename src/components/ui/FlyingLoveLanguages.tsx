import { I_LOVE_YOU_100 } from '@/lib/i-love-you-100';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

export default function FlyingLoveLanguages() {
  const [independentHearts, setIndependentHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate independent heart positions (different from FloatingHearts)
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 4,
    }));
    setIndependentHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {independentHearts.map((heart, i) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.9, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: heart.delay,
          }}
          style={{
            position: 'absolute',
            fontSize: '1.25rem',
            color: 'rgba(251, 113, 133, 0.95)',
            fontWeight: 700,
            left: 0,
            zIndex: 20,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {I_LOVE_YOU_100[i % I_LOVE_YOU_100.length]}
        </motion.div>
      ))}
    </div>
  );
}
