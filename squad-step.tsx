'use client'

import { motion } from 'motion/react'
import { Trophy, Crown } from 'lucide-react'
import { useDraft } from '@/lib/draft-store'
import { useGame } from '@/lib/game-store'
import { getFormation } from '@/lib/data/formations'
import { Pitch } from './pitch'
import { StatsPanel } from './stats-panel'
import { ChemistryPanel } from './chemistry-panel'
import { DraftPool } from './draft-pool'

export function SquadStep() {
  const { manager, formationId, isComplete, stats, setPhase, placed } =
    useDraft()
  const { recordDraft, unlockAchievement, addXp } = useGame()
  const formation = getFormation(formationId)

  const startTournament = () => {
    recordDraft(stats.chemistry.total, stats.ovr)
    addXp(300)
    unlockAchievement('first-draft')
    setPhase('tournament')
  }

  return (
    <div className="pb-24">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            Step 3 of 3 · {formation.name}
          </p>
          <h1 className="text-2xl font-black">Build Your XI</h1>
        </div>
        <button
          onClick={() => setPhase('manager')}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
        >
          Back
        </button>
      </div>

      {/* manager strip */}
      {manager && (
        <div className="mb-3 flex items-center gap-3 rounded-2xl glass-gold p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl gold-surface text-lg font-black">
            {manager.name.charAt(0)}
          </span>
          <div className="flex-1">
            <p className="flex items-center gap-1 text-sm font-bold">
              <Crown className="h-3.5 w-3.5 text-gold" /> {manager.name}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {manager.flag} {manager.trait} · +{manager.chemistry} System
            </p>
          </div>
        </div>
      )}

      <StatsPanel />

      <div className="mt-4">
        <Pitch />
      </div>

      <div className="mt-4">
        <ChemistryPanel />
      </div>

      {isComplete && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={startTournament}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl gold-surface py-4 text-base font-black shadow-lg shimmer"
        >
          <Trophy className="h-5 w-5" />
          Enter Tournament
        </motion.button>
      )}

      <div className="mt-5 border-t border-border/60 pt-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Draft Pool {!isComplete && `· ${11 - placed.length} slots open`}
        </h2>
        <DraftPool />
      </div>
    </div>
  )
}
