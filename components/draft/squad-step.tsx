'use client'

import { useState } from 'react' // YENİ
import { motion } from 'motion/react'
import { Trophy, Crown, RefreshCw } from 'lucide-react' // YENİ
import { useDraft } from '@/lib/draft-store'
import { useGame } from '@/lib/game-store'
import { getFormation } from '@/lib/data/formations'
import { SQUAD_POOLS } from '@/lib/data/players' // YENİ: Havuz importu
import { Pitch } from './pitch'
import { StatsPanel } from './stats-panel'
import { ChemistryPanel } from './chemistry-panel'
import { DraftPool } from './draft-pool'

export function SquadStep() {
  const { manager, formationId, isComplete, stats, setPhase, placed } = useDraft()
  const { recordDraft, unlockAchievement, addXp } = useGame()
  
  // YENİ: Seçili sezon havuzu (Örn: 'Real Madrid 2017')
  const [selectedPool, setSelectedPool] = useState<string>('Real Madrid 2017')
  const formation = getFormation(formationId)

  const startTournament = () => {
    recordDraft(stats.chemistry.total, stats.ovr)
    addXp(300)
    unlockAchievement('first-draft')
    setPhase('tournament')
  }

  // YENİ: Havuz değiştirme fonksiyonu
  const rotatePool = () => {
    const keys = Object.keys(SQUAD_POOLS)
    const nextKey = keys[Math.floor(Math.random() * keys.length)]
    setSelectedPool(nextKey)
  }

  return (
    <div className="pb-24">
      {/* ... Üst Kısım (Adımlar) aynı kalsın ... */}
      
      {/* SEZON DEĞİŞTİRME BUTONU */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-secondary/30 p-3">
        <div>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Active Pool</p>
          <p className="font-bold text-sm text-gold">{selectedPool}</p>
        </div>
        <button onClick={rotatePool} className="p-2 glass rounded-full">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* manager strip ... (aynı) */}

      <div className="mt-5 border-t border-border/60 pt-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Draft Pool {!isComplete && `· ${11 - placed.length} slots open`}
        </h2>
        
        {/* YENİ: seçili havuzu DraftPool'a gönderiyoruz */}
        <DraftPool poolKey={selectedPool} />
      </div>

      {/* ... Enter Tournament butonu (aynı) */}
    </div>
  )
}
