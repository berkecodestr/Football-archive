export type Era = '70s' | '80s' | '90s' | '00s' | '10s' | '20s'
export type SquadType = 'club' | 'national'
export type Rarity = 'common' | 'rare' | 'epic' | 'icon' | 'hero' | 'secret'

export type Position =
  | 'GK'
  | 'RB'
  | 'CB'
  | 'LB'
  | 'RWB'
  | 'LWB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'RM'
  | 'LM'
  | 'RW'
  | 'LW'
  | 'ST'
  | 'CF'

export interface Player {
  id: string
  name: string
  rating: number
  position: Position
  altPositions?: Position[]
  nation: string
  flag: string
  team: string
  era: Era
  type: SquadType
  rarity: Rarity
}

export interface FormationSlot {
  id: string
  position: Position
  /** percentage coordinates on pitch, 0-100 */
  x: number
  y: number
}

export interface Formation {
  id: string
  name: string
  style: string
  slots: FormationSlot[]
}

export interface Manager {
  id: string
  name: string
  nation: string
  flag: string
  formation: string
  chemistry: number
  trait: string
  rating: number
}

export interface PlacedPlayer extends Player {
  slotId: string
}

export type PackTier =
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'premium'
  | 'legend'
  | 'icon'
  | 'worldcup'
  | 'ultimate'

export interface Pack {
  id: PackTier
  name: string
  price: number
  cards: number
  minRating: number
  maxRating: number
  accent: string
  description: string
}

export interface QuizQuestion {
  id: string
  category: string
  question: string
  options: string[]
  answer: number
}

export interface TournamentTeam {
  name: string
  year: string
  flag: string
  power: number
}

export interface Match {
  home: TournamentTeam
  away: TournamentTeam
  homeScore: number
  awayScore: number
  penalties?: [number, number]
  mvp: string
  winner: TournamentTeam
}

export interface Achievement {
  id: string
  title: string
  description: string
  reward: number
  icon: string
  unlocked: boolean
}
