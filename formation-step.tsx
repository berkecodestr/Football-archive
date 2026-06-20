'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { FORMATIONS } from '@/lib/data/formations'
import { useDraft } from '@/lib/draft-store'
import { cn } from '@/lib/utils'

function MiniPitch({ slots }: { slots: { x: number; y: number }[] }) {
  return (
    <div className="relative h-20 w-full overflow-hidden rounded-lg border border-border/60 bg-[#06140c]">
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      {slots.map((s, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        />
      ))}
    </div>
  )
}

export function FormationStep() {
  const { chooseFormation } = useDraft()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div>
      <div className="mb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
          Step 1 of 3
        </p>
        <h1 className="text-2xl font-black">Choose Formation</h1>
        <p className="text-sm text-muted-foreground">
          Your tactical shape defines the draft slots and chemistry links.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {FORMATIONS.map((f, i) => (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => setSelected(f.id)}
            className={cn(
              'rounded-2xl glass p-3 text-left transition-all active:scale-[0.98]',
              selected === f.id && 'glass-gold glow-gold',
            )}
          >
            <MiniPitch slots={f.slots} />
            <h3 className="mt-2 text-sm font-bold">{f.name}</h3>
            <p className="text-[11px] text-muted-foreground">{f.style}</p>
          </motion.button>
        ))}
      </div>

      <div className="sticky bottom-2 mt-5">
        <button
          disabled={!selected}
          onClick={() => selected && chooseFormation(selected)}
          className="w-full rounded-2xl gold-surface py-3.5 text-sm font-bold shadow-lg transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          Continue to Manager
        </button>
      </div>
    </div>
  )
}
