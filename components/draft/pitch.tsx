'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Plus, X } from 'lucide-react'
import { getFormation } from '@/lib/data/formations'
import { useDraft } from '@/lib/draft-store'
import { cn } from '@/lib/utils'

export function Pitch() {
  const { formationId, placed, activeSlot, setActiveSlot, removeSlot } =
    useDraft()
  const formation = getFormation(formationId)
  const placedMap = new Map(placed.map((p) => [p.slotId, p]))

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-border/60">
      {/* turf */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2417] via-[#06170e] to-[#040d08]" />
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-x-0 h-[12.5%]',
              i % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent',
            )}
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      {/* markings */}
      <div className="pointer-events-none absolute inset-3 rounded-2xl border border-white/15" />
      <div className="pointer-events-none absolute inset-x-3 top-1/2 h-px bg-white/15" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
      <div className="pointer-events-none absolute left-1/2 top-3 h-12 w-28 -translate-x-1/2 rounded-b-xl border border-t-0 border-white/15" />
      <div className="pointer-events-none absolute bottom-3 left-1/2 h-12 w-28 -translate-x-1/2 rounded-t-xl border border-b-0 border-white/15" />

      {/* slots */}
      {formation.slots.map((slot) => {
        const player = placedMap.get(slot.id)
        const isActive = activeSlot === slot.id
        return (
          <div
            key={slot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          >
            <AnimatePresence mode="wait">
              {player ? (
                <motion.button
                  key="filled"
                  initial={{ scale: 0, y: -20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  onClick={() => removeSlot(slot.id)}
                  className="group relative flex flex-col items-center"
                >
                  <span className="relative flex h-11 w-11 flex-col items-center justify-center rounded-full border-2 border-primary bg-background/90 shadow-lg glow-gold">
                    <span className="text-[13px] font-black leading-none gold-gradient-text">
                      {player.rating}
                    </span>
                    <span className="text-[7px] font-bold text-muted-foreground">
                      {slot.position}
                    </span>
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive opacity-0 transition-opacity group-hover:opacity-100">
                      <X className="h-2.5 w-2.5 text-white" />
                    </span>
                  </span>
                  <span className="mt-1 max-w-[60px] truncate rounded-full bg-background/80 px-1.5 text-[8px] font-bold">
                    {player.name.split(' ').slice(-1)[0]}
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  key="empty"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  onClick={() => setActiveSlot(isActive ? null : slot.id)}
                  className={cn(
                    'flex h-10 w-10 flex-col items-center justify-center rounded-full border-2 border-dashed transition-all',
                    isActive
                      ? 'border-neon bg-accent/15 pulse-ring'
                      : 'border-white/25 bg-white/5 hover:border-primary/60',
                  )}
                >
                  <Plus
                    className={cn(
                      'h-3.5 w-3.5',
                      isActive ? 'text-neon' : 'text-white/60',
                    )}
                  />
                  <span
                    className={cn(
                      'text-[7px] font-bold',
                      isActive ? 'text-neon' : 'text-white/50',
                    )}
                  >
                    {slot.position}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
