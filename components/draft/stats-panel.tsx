'use client'

import { motion } from 'motion/react'
import { Swords, Shield, Star, Users } from 'lucide-react'
import { useDraft } from '@/lib/draft-store'
import { getFormation } from '@/lib/data/formations'

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: string
  icon: typeof Star
  accent: 'gold' | 'neon'
}) {
  return (
    <motion.div
      layout
      className="flex flex-col gap-1 rounded-2xl glass p-3"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
          accent === 'gold'
            ? 'bg-primary/15 text-gold'
            : 'bg-accent/15 text-neon'
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <motion.span
        key={value}
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-xl font-black tabular-nums ${
          accent === 'neon' ? 'text-neon glow-neon-text' : 'gold-gradient-text'
        }`}
      >
        {value}
      </motion.span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </motion.div>
  )
}

export function StatsPanel() {
  const { stats, formationId } = useDraft()
  const total = getFormation(formationId).slots.length

  return (
    <div className="grid grid-cols-4 gap-2">
      <StatCard
        label="Team OVR"
        value={stats.ovr ? stats.ovr.toFixed(1) : '—'}
        icon={Star}
        accent="gold"
      />
      <StatCard
        label="Attack"
        value={stats.attack ? String(stats.attack) : '—'}
        icon={Swords}
        accent="neon"
      />
      <StatCard
        label="Defense"
        value={stats.defense ? String(stats.defense) : '—'}
        icon={Shield}
        accent="neon"
      />
      <StatCard
        label="Squad"
        value={`${stats.count}/${total}`}
        icon={Users}
        accent="gold"
      />
    </div>
  )
}
