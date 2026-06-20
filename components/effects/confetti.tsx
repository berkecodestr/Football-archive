'use client'

import { motion } from 'motion/react'
import { useMemo } from 'react'

const COLORS = ['#d4af37', '#f0d77b', '#32ff9c', '#ffffff', '#b8860b']

export function Confetti({ count = 80 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.8 + Math.random() * 1.6,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 6,
        rotate: Math.random() * 360,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -40, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', rotate: p.rotate + 360, opacity: [1, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          className="absolute top-0"
          style={{
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  )
}
