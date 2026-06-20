'use client'

import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react'
import type { Achievement, Player } from '@/lib/types'

export interface GameState {
  coins: number
  xp: number
  level: number
  collection: Player[]
  activeClubFilter: string | null 
  freePackClaimed: boolean
  dailyClaimed: boolean
  stats: {
    drafts: number
    championships: number
    bestRating: number
    highestChem: number
    packsOpened: number
    quizWins: number
    quizAccuracy: number
  }
  achievements: Achievement[]
  activeStadium: string
  activeJersey: string
}

interface GameContextValue {
  state: GameState
  dispatch: React.Dispatch<Action>
  setClubFilter: (club: string | null) => void
  filteredPlayers: Player[]
  xpProgress: number
  recordDraft: (chem: number, rating: number) => void
  addXp: (amount: number) => void
  unlockAchievement: (id: string) => void
}

const initialState: GameState = {
  coins: 100,
  xp: 350,
  level: 7,
  collection: [],
  activeClubFilter: null,
  freePackClaimed: false,
  dailyClaimed: false,
  stats: {
    drafts: 3,
    championships: 1,
    bestRating: 91,
    highestChem: 86,
    packsOpened: 4,
    quizWins: 12,
    quizAccuracy: 78,
  },
  achievements: [],
  activeStadium: 'Camp Nou',
  activeJersey: 'Brazil 2002',
}

const GameContext = createContext<GameContextValue | null>(null)

type Action =
  | { type: 'ADD_COINS'; amount: number }
  | { type: 'SET_CLUB_FILTER'; club: string | null }
  | { type: 'ADD_XP'; amount: number }
  | { type: 'RECORD_DRAFT'; chem: number; rating: number }
  | { type: 'UNLOCK_ACHIEVEMENT'; id: string }

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_CLUB_FILTER': return { ...state, activeClubFilter: action.club }
    case 'ADD_XP': return { ...state, xp: state.xp + action.amount }
    default: return state
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setClubFilter = useCallback((club: string | null) => dispatch({ type: 'SET_CLUB_FILTER', club }), [])
  const addXp = useCallback((amount: number) => dispatch({ type: 'ADD_XP', amount }), [])
  const recordDraft = useCallback((chem: number, rating: number) => dispatch({ type: 'RECORD_DRAFT', chem, rating }), [])
  const unlockAchievement = useCallback((id: string) => dispatch({ type: 'UNLOCK_ACHIEVEMENT', id }), [])

  const filteredPlayers: Player[] = useMemo(() => [], []) 
  const xpProgress = Math.min((state.xp % 1000) / 10, 100)

  return (
    <GameContext.Provider value={{ state, dispatch, setClubFilter, filteredPlayers, xpProgress, recordDraft, addXp, unlockAchievement }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = (): GameContextValue => {
  const context = useContext(GameContext)
  
  if (!context) {
    return {
      state: initialState,
      dispatch: () => null,
      setClubFilter: () => null,
      filteredPlayers: [],
      xpProgress: 0,
      recordDraft: () => null,
      addXp: () => null,
      unlockAchievement: () => null
    }
  }
  
  return context
}
