'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Dices, X } from 'lucide-react'
import { PLAYERS } from '@/lib/data/players'
import { useDraft } from '@/lib/draft-store'
import { getFormation } from '@/lib/data/formations'
import { PlayerTile } from './player-tile'
import type { Era, Player } from '@/lib/types'
import { cn } from '@/lib/utils'

const ERAS: Era[] = ['80s', '90s', '00s', '10s', '20s']

type Filter = Era | 'national' | 'club'

function fitsSlot(player: Player, slotPos: string): boolean {
  return player.position === slotPos || (player.altPositions?.includes(slotPos as never) ?? false)
}

export function DraftPool() {
  const { activeSlot, setActiveSlot, placePlayer, placed, formationId } =
    useDraft()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filter[]>([])
  const [rollSeed, setRollSeed] = useState(0)
  const [rolling, setRolling] = useState(false)
  const [info, setInfo] = useState<Player | null>(null)

  const formation = getFormation(formationId)
  const activeSlotPos = activeSlot
    ? formation.slots.find((s) => s.id === activeSlot)?.position
    : null
  const usedIds = new Set(placed.map((p) => p.id))

  const toggleFilter = (f: Filter) =>
    setFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    )

  const pool = useMemo(() => {
    const eraFilters = filters.filter((f) => ERAS.includes(f as Era)) as Era[]
    const typeFilters = filters.filter((f) => f === 'national' || f === 'club')

    let list = PLAYERS.filter((p) => !usedIds.has(p.id))
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q) ||
          p.nation.toLowerCase().includes(q),
      )
    }
    if (eraFilters.length) list = list.filter((p) => eraFilters.includes(p.era))
    if (typeFilters.length)
      list = list.filter((p) => typeFilters.includes(p.type))

    // Prioritise players that fit the active slot
    if (activeSlotPos) {
      list = [...list].sort((a, b) => {
        const af = fitsSlot(a, activeSlotPos) ? 1 : 0
        const bf = fitsSlot(b, activeSlotPos) ? 1 : 0
        if (af !== bf) return bf - af
        return b.rating - a.rating
      })
    } else {
      list = [...list].sort((a, b) => b.rating - a.rating)
    }
    // rollSeed forces a re-shuffle of the top tier when rolling
    if (rollSeed) {
      const top = list.slice(0, 18)
      for (let i = top.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[top[i], top[j]] = [top[j], top[i]]
      }
      list = [...top, ...list.slice(18)]
    }
    return list.slice(0, 24)
  }, [query, filters, usedIds, activeSlotPos, rollSeed])

  const roll = () => {
    setRolling(true)
    setTimeout(() => {
      setRollSeed((s) => s + 1)
      setRolling(false)
    }, 500)
  }

  const handleSelect = (player: Player) => {
    if (activeSlot) placePlayer(activeSlot, player)
  }

  return (
    <div>
      {/* active slot banner */}
      <AnimatePresence>
        {activeSlot && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-3 py-2"
          >
            <span className="text-xs font-semibold text-neon">
              Placing into {activeSlotPos} slot — tap a player
            </span>
            <button onClick={() => setActiveSlot(null)} aria-label="Cancel">
              <X className="h-4 w-4 text-neon" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* search + roll */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players, clubs, nations…"
            className="w-full rounded-xl border border-border bg-secondary py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
          />
        </div>
        <button
          onClick={roll}
          className="flex items-center gap-1.5 rounded-xl gold-surface px-4 text-sm font-bold transition-transform active:scale-95"
        >
          <Dices className={cn('h-4 w-4', rolling && 'animate-spin')} />
          Roll
        </button>
      </div>

      {/* filter chips */}
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {[...ERAS, 'national', 'club'].map((f) => {
          const label =
            f === 'national' ? 'National' : f === 'club' ? 'Club' : f
          const active = filters.includes(f as Filter)
          return (
            <button
              key={f}
              onClick={() => toggleFilter(f as Filter)}
              className={cn(
                'whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                active
                  ? 'border-primary bg-primary/15 text-gold'
                  : 'border-border bg-secondary text-muted-foreground',
              )}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* list */}
      <div className="mt-3 grid gap-2">
        {pool.map((player, i) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(i * 0.015, 0.3) }}
          >
            <PlayerTile
              player={player}
              selected={
                !!activeSlotPos && fitsSlot(player, activeSlotPos)
              }
              onSelect={() => handleSelect(player)}
              onInfo={() => setInfo(player)}
            />
          </motion.div>
        ))}
        {pool.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No players match your filters.
          </p>
        )}
      </div>

      {/* info dialog */}
      <AnimatePresence>
        {info && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInfo(null)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
          >
            <motion.div
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl glass-gold p-5"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{info.flag}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-black">{info.name}</h3>
                  <p className="text-sm text-muted-foreground">{info.team}</p>
                </div>
                <span className="text-3xl font-black gold-gradient-text">
                  {info.rating}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <Stat label="Position" value={info.position} />
                <Stat label="Nation" value={info.nation} />
                <Stat label="Era" value={info.era} />
                <Stat
                  label="Type"
                  value={info.type === 'club' ? 'Club' : 'National'}
                />
              </div>
              {info.altPositions && info.altPositions.length > 0 && (
                <div className="mt-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Alternate positions
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {info.altPositions.map((pos) => (
                      <span
                        key={pos}
                        className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold"
                      >
                        {pos}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => setInfo(null)}
                className="mt-5 w-full rounded-xl bg-secondary py-2.5 text-sm font-bold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background/40 p-2.5">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-bold">{value}</p>
    </div>
  )
}
