'use client'

import { Info } from 'lucide-react'
import type { Player } from '@/lib/types'
import { cn } from '@/lib/utils'

const ERA_COLORS: Record<string, string> = {
  '70s': '#9a7b3f',
  '80s': '#b8860b',
  '90s': '#d4af37',
  '00s': '#32d0ff',
  '10s': '#32ff9c',
  '20s': '#ff3da6',
}

interface Props {
  player: Player
  selected?: boolean
  onSelect?: () => void
  onInfo?: () => void
  compact?: boolean
}

/**
 * Clean, realistic player tile for VIP Draft mode.
 * Intentionally NOT a FUT-style collectible card.
 */
export function PlayerTile({ player, selected, onSelect, onInfo, compact }: Props) {
  const eraColor = ERA_COLORS[player.era] ?? '#d4af37'
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group relative flex cursor-pointer items-center gap-3 rounded-2xl glass p-3 transition-all active:scale-[0.98]',
        selected && 'glass-gold glow-gold',
        compact && 'p-2.5',
      )}
    >
      {/* rating */}
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-primary/30 bg-background/50">
        <span className="text-lg font-black leading-none gold-gradient-text">
          {player.rating}
        </span>
        <span className="text-[9px] font-bold uppercase text-muted-foreground">
          {player.position}
        </span>
      </div>

      {/* identity */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-base leading-none">{player.flag}</span>
          <h3 className="truncate text-sm font-bold">{player.name}</h3>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="truncate text-[11px] text-muted-foreground">
            {player.team}
          </span>
          <span
            className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase"
            style={{ background: `${eraColor}22`, color: eraColor }}
          >
            {player.era}
          </span>
        </div>
      </div>

      {onInfo && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onInfo()
          }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`Info about ${player.name}`}
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
