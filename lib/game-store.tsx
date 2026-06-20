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

// --- YENİ EK: Örnek Oyuncu Verisi Yapısı ---
// Bu kısmı kendi oyuncu verilerinle doldurabilirsin
export const ALL_PLAYERS: Player[] = [
  { id: '1', name: 'Vinícius Jr', rating: 91, club: 'Real Madrid', position: 'LW' },
  { id: '2', name: 'Kylian Mbappé', rating: 92, club: 'Real Madrid', position: 'ST' },
  { id: '3', name: 'Jude Bellingham', rating: 90, club: 'Real Madrid', position: 'CAM' },
  // ... diğer oyuncuların
];

export interface GameState {
  coins: number
  xp: number
  level: number
  collection: Player[]
  // --- YENİ EK ---
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

// ... (XP_PER_LEVEL ve INITIAL_ACHIEVEMENTS aynı kalıyor) ...

const initialState: GameState = {
  coins: 100,
  xp: 350,
  level: 7,
  collection: [],
  activeClubFilter: null, // Başlangıçta filtre yok
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
  | { type: 'SET_CLUB_FILTER'; club: string | null } // YENİ ACTION
  | { type: 'CLAIM_FREE_PACK' }
  | { type: 'CLAIM_DAILY' }
  | { type: 'UNLOCK_ACHIEVEMENT'; id: string }
  | { type: 'SET_STADIUM'; value: string }
  | { type: 'SET_JERSEY'; value: string }
  | { type: 'RECORD_DRAFT'; chem: number; rating: number }
  | { type: 'RECORD_CHAMPIONSHIP' }
  | { type: 'RECORD_QUIZ'; won: boolean; accuracy: number }

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_CLUB_FILTER': // YENİ REDUCER MANTIĞI
      return { ...state, activeClubFilter: action.club }
    // ... (diğer case'ler aynı kalıyor)
    case 'ADD_COINS': return { ...state, coins: state.coins + action.amount }
    case 'SPEND_COINS': return { ...state, coins: Math.max(0, state.coins - action.amount) }
    case 'ADD_XP': {
      const xp = state.xp + action.amount
      return { ...state, xp, level: levelFor(xp) }
    }
    case 'ADD_CARDS': {
      const collection = [...state.collection, ...action.cards]
      return { ...state, collection, stats: { ...state.stats, packsOpened: state.stats.packsOpened + 1 } }
    }
    // ... (diğer case'ler eksiksiz devam etmeli)
    default: return state
  }
}

// ... (GameContextValue arayüzüne `setClubFilter` ve `filteredPlayers` ekle) ...

// GameProvider içinde:
const setClubFilter = (club: string | null) => dispatch({ type: 'SET_CLUB_FILTER', club })

const filteredPlayers = useMemo(() => {
  if (!state.activeClubFilter) return ALL_PLAYERS
  return ALL_PLAYERS.filter(p => p.club === state.activeClubFilter)
}, [state.activeClubFilter])

// Value kısmına ekle:
// setClubFilter,
// filteredPlayers,
