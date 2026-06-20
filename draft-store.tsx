'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { Manager, PlacedPlayer, Player } from '@/lib/types'
import { getFormation } from '@/lib/data/formations'
import { computeSquadStats, type SquadStats } from '@/lib/squad'

export type DraftPhase =
  | 'formation'
  | 'manager'
  | 'squad'
  | 'tournament'
  | 'champion'

interface DraftContextValue {
  phase: DraftPhase
  setPhase: (p: DraftPhase) => void
  formationId: string
  chooseFormation: (id: string) => void
  manager: Manager | null
  chooseManager: (m: Manager) => void
  placed: PlacedPlayer[]
  activeSlot: string | null
  setActiveSlot: (id: string | null) => void
  placePlayer: (slotId: string, player: Player) => void
  removeSlot: (slotId: string) => void
  isComplete: boolean
  stats: SquadStats
  reset: () => void
}

const DraftContext = createContext<DraftContextValue | null>(null)

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<DraftPhase>('formation')
  const [formationId, setFormationId] = useState('4-3-3-attack')
  const [manager, setManager] = useState<Manager | null>(null)
  const [placed, setPlaced] = useState<PlacedPlayer[]>([])
  const [activeSlot, setActiveSlot] = useState<string | null>(null)

  const formation = getFormation(formationId)

  const chooseFormation = useCallback((id: string) => {
    setFormationId(id)
    setPlaced([])
    setPhase('manager')
  }, [])

  const chooseManager = useCallback((m: Manager) => {
    setManager(m)
    setPhase('squad')
  }, [])

  const placePlayer = useCallback((slotId: string, player: Player) => {
    setPlaced((prev) => {
      const without = prev.filter((p) => p.slotId !== slotId)
      return [...without, { ...player, slotId }]
    })
    setActiveSlot(null)
  }, [])

  const removeSlot = useCallback((slotId: string) => {
    setPlaced((prev) => prev.filter((p) => p.slotId !== slotId))
  }, [])

  const stats = useMemo(
    () => computeSquadStats(placed, formation, manager),
    [placed, formation, manager],
  )

  const isComplete = placed.length === formation.slots.length

  const reset = useCallback(() => {
    setPhase('formation')
    setFormationId('4-3-3-attack')
    setManager(null)
    setPlaced([])
    setActiveSlot(null)
  }, [])

  const value: DraftContextValue = {
    phase,
    setPhase,
    formationId,
    chooseFormation,
    manager,
    chooseManager,
    placed,
    activeSlot,
    setActiveSlot,
    placePlayer,
    removeSlot,
    isComplete,
    stats,
    reset,
  }

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
}

export function useDraft() {
  const ctx = useContext(DraftContext)
  if (!ctx) throw new Error('useDraft must be used within DraftProvider')
  return ctx
}
