'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Dices, X } from 'lucide-react'
import { SQUAD_POOLS } from '@/lib/data/players' // Güncel havuz importu
import { useDraft } from '@/lib/draft-store'
import { getFormation } from '@/lib/data/formations'
import { PlayerTile } from './player-tile'
import type { Player } from '@/lib/types'
import { cn } from '@/lib/utils'

interface DraftPoolProps {
  poolKey: string // SquadStep'ten gelen seçili sezon
}

export function DraftPool({ poolKey }: DraftPoolProps) {
  const { activeSlot, setActiveSlot, placePlayer, placed, formationId } = useDraft()
  const [query, setQuery] = useState('')
  const [rolling, setRolling] = useState(false)
  const [info, setInfo] = useState<Player | null>(null)

  const formation = getFormation(formationId)
  const activeSlotPos = activeSlot
    ? formation.slots.find((s) => s.id === activeSlot)?.position
    : null
  
  const usedIds = new Set(placed.map((p) => p.id))

  // Sezon bazlı havuzu çekiyoruz
  const pool = useMemo(() => {
    let list = (SQUAD_POOLS[poolKey] || []).filter((p) => !usedIds.has(p.id))
    
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q)
      )
    }

    // Pozisyon eşleşmesi önceliği
    if (activeSlotPos) {
      list = [...list].sort((a, b) => {
        const af = (a.position === activeSlotPos) ? 1 : 0
        const bf = (b.position === activeSlotPos) ? 1 : 0
        return bf - af || b.rating - a.rating
      })
    }
    
    return list
  }, [query, poolKey, usedIds, activeSlotPos])

  const handleSelect = (player: Player) => {
    if (activeSlot) placePlayer(activeSlot, player)
  }

  return (
    <div>
      {/* ... (Search ve Banner kısmı aynı kalmalı) ... */}
      
      <div className="mt-3 grid gap-2">
        {pool.map((player, i) => (
          <motion.div key={player.id}>
            <PlayerTile
              player={player}
              selected={!!activeSlotPos && (player.position === activeSlotPos)}
              onSelect={() => handleSelect(player)}
              onInfo={() => setInfo(player)}
            />
          </motion.div>
        ))}
      </div>
      
      {/* ... (Info Dialog kısmı aynı) ... */}
    </div>
  )
}
