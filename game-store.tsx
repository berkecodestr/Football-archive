'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type { Achievement, Player } from '@/lib/types'

export interface GameState {
  coins: number
  xp: number
  level: number
  collection: Player[]
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

const XP_PER_LEVEL = 1000

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-draft', title: 'First Draft', description: 'Complete your first VIP Draft squad', reward: 200, icon: 'flag', unlocked: false },
  { id: 'first-champ', title: 'First Championship', description: 'Win a tournament', reward: 500, icon: 'trophy', unlocked: false },
  { id: 'pack-50', title: 'Pack Hunter', description: 'Open 50 packs', reward: 1000, icon: 'package', unlocked: false },
  { id: 'first-icon', title: 'Icon Collector', description: 'Pull your first Icon card', reward: 750, icon: 'star', unlocked: false },
  { id: 'quiz-100', title: 'Quiz Master', description: 'Win 100 quiz rounds', reward: 1500, icon: 'brain', unlocked: false },
  { id: 'level-50', title: 'Veteran Manager', description: 'Reach level 50', reward: 5000, icon: 'medal', unlocked: false },
]

const initialState: GameState = {
  coins: 100,
  xp: 350,
  level: 7,
  collection: [],
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
  achievements: INITIAL_ACHIEVEMENTS,
  activeStadium: 'Camp Nou',
  activeJersey: 'Brazil 2002',
}

type Action =
  | { type: 'ADD_COINS'; amount: number }
  | { type: 'SPEND_COINS'; amount: number }
  | { type: 'ADD_XP'; amount: number }
  | { type: 'ADD_CARDS'; cards: Player[] }
  | { type: 'CLAIM_FREE_PACK' }
  | { type: 'CLAIM_DAILY' }
  | { type: 'UNLOCK_ACHIEVEMENT'; id: string }
  | { type: 'SET_STADIUM'; value: string }
  | { type: 'SET_JERSEY'; value: string }
  | { type: 'RECORD_DRAFT'; chem: number; rating: number }
  | { type: 'RECORD_CHAMPIONSHIP' }
  | { type: 'RECORD_QUIZ'; won: boolean; accuracy: number }

function levelFor(xp: number) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1)
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'ADD_COINS':
      return { ...state, coins: state.coins + action.amount }
    case 'SPEND_COINS':
      return { ...state, coins: Math.max(0, state.coins - action.amount) }
    case 'ADD_XP': {
      const xp = state.xp + action.amount
      return { ...state, xp, level: levelFor(xp) }
    }
    case 'ADD_CARDS': {
      const collection = [...state.collection, ...action.cards]
      const bestRating = Math.max(
        state.stats.bestRating,
        ...action.cards.map((c) => c.rating),
      )
      return {
        ...state,
        collection,
        stats: {
          ...state.stats,
          packsOpened: state.stats.packsOpened + 1,
          bestRating,
        },
      }
    }
    case 'CLAIM_FREE_PACK':
      return { ...state, freePackClaimed: true }
    case 'CLAIM_DAILY':
      return state.dailyClaimed
        ? state
        : { ...state, dailyClaimed: true, coins: state.coins + 150, xp: state.xp + 100 }
    case 'UNLOCK_ACHIEVEMENT': {
      const ach = state.achievements.find((a) => a.id === action.id)
      if (!ach || ach.unlocked) return state
      return {
        ...state,
        coins: state.coins + ach.reward,
        achievements: state.achievements.map((a) =>
          a.id === action.id ? { ...a, unlocked: true } : a,
        ),
      }
    }
    case 'SET_STADIUM':
      return { ...state, activeStadium: action.value }
    case 'SET_JERSEY':
      return { ...state, activeJersey: action.value }
    case 'RECORD_DRAFT':
      return {
        ...state,
        stats: {
          ...state.stats,
          drafts: state.stats.drafts + 1,
          highestChem: Math.max(state.stats.highestChem, action.chem),
          bestRating: Math.max(state.stats.bestRating, Math.round(action.rating)),
        },
      }
    case 'RECORD_CHAMPIONSHIP':
      return {
        ...state,
        stats: { ...state.stats, championships: state.stats.championships + 1 },
      }
    case 'RECORD_QUIZ': {
      const quizWins = state.stats.quizWins + (action.won ? 1 : 0)
      return {
        ...state,
        stats: {
          ...state.stats,
          quizWins,
          quizAccuracy: Math.round((state.stats.quizAccuracy + action.accuracy) / 2),
        },
      }
    }
    default:
      return state
  }
}

interface GameContextValue {
  state: GameState
  xpProgress: number
  addCoins: (n: number) => void
  spendCoins: (n: number) => boolean
  addXp: (n: number) => void
  addCards: (cards: Player[]) => void
  claimFreePack: () => void
  claimDaily: () => void
  unlockAchievement: (id: string) => void
  setStadium: (v: string) => void
  setJersey: (v: string) => void
  recordDraft: (chem: number, rating: number) => void
  recordChampionship: () => void
  recordQuiz: (won: boolean, accuracy: number) => void
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo<GameContextValue>(() => {
    return {
      state,
      xpProgress: ((state.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100,
      addCoins: (n) => dispatch({ type: 'ADD_COINS', amount: n }),
      spendCoins: (n) => {
        if (state.coins < n) return false
        dispatch({ type: 'SPEND_COINS', amount: n })
        return true
      },
      addXp: (n) => dispatch({ type: 'ADD_XP', amount: n }),
      addCards: (cards) => dispatch({ type: 'ADD_CARDS', cards }),
      claimFreePack: () => dispatch({ type: 'CLAIM_FREE_PACK' }),
      claimDaily: () => dispatch({ type: 'CLAIM_DAILY' }),
      unlockAchievement: (id) => dispatch({ type: 'UNLOCK_ACHIEVEMENT', id }),
      setStadium: (v) => dispatch({ type: 'SET_STADIUM', value: v }),
      setJersey: (v) => dispatch({ type: 'SET_JERSEY', value: v }),
      recordDraft: (chem, rating) =>
        dispatch({ type: 'RECORD_DRAFT', chem, rating }),
      recordChampionship: () => dispatch({ type: 'RECORD_CHAMPIONSHIP' }),
      recordQuiz: (won, accuracy) =>
        dispatch({ type: 'RECORD_QUIZ', won, accuracy }),
    }
  }, [state])

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
