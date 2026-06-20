'use client'

import { motion } from 'motion/react'
import { useDraft } from '@/lib/draft-store'

const SOURCES: {
  key: 'positionFit' | 'linkLines' | 'coachSystem' | 'coachNation'
  label: string
  max: number
}[] = [
  { key: 'positionFit', label: 'Position Fit', max: 35 },
  { key: 'linkLines', label: 'Link Lines', max: 30 },
  { key: 'coachSystem', label: 'Coach System', max: 20 },
  { key: 'coachNation', label: 'Coach Nation', max: 15 },
]

export function ChemistryPanel() {
  const { stats } = useDraft()
  const chem = stats.chemistry

  return (
    <div className="rounded-2xl glass p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide">Chemistry</h3>
        <motion.span
          key={chem.total}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="text-2xl font-black text-neon glow-neon-text tabular-nums"
        >
          {chem.total}
        </motion.span>
      </div>

      {/* main bar */}
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#0c9e5e] via-[#32ff9c] to-[#7dffc4]"
          animate={{ width: `${chem.total}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>

      {/* breakdown */}
      <div className="mt-4 grid gap-3">
        {SOURCES.map((s) => {
          const v = chem[s.key]
          const pct = (v / s.max) * 100
          return (
            <div key={s.key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-bold tabular-nums">
                  {v}
                  <span className="text-muted-foreground">/{s.max}</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gold"
                  animate={{ width: `${pct}%` }}
                  transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
