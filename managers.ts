import type { Manager } from '@/lib/types'

const NAMES = [
  'Vittorio Lancini',
  'Marcelo Bielsa Jr.',
  'Heinrich Vogel',
  'Carlos Mendoza',
  'Pep Aurelio',
  'Diego Castellano',
  'Jürgen Falk',
  'Antonio De Luca',
  'Rafael Moreno',
  'Erik ten Holt',
  'Massimo Conti',
  'Didier Lacroix',
]

const NATIONS: [string, string][] = [
  ['Italy', '🇮🇹'],
  ['Germany', '🇩🇪'],
  ['Spain', '🇪🇸'],
  ['France', '🇫🇷'],
  ['Brazil', '🇧🇷'],
  ['Argentina', '🇦🇷'],
  ['Netherlands', '🇳🇱'],
  ['Portugal', '🇵🇹'],
  ['England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿'],
]

const TRAITS = [
  'Attacking Specialist',
  'Defensive Specialist',
  'Pressing Specialist',
  'Tactical Mastermind',
  'Youth Development',
]

const FORMATION_IDS = [
  '4-3-3-attack',
  '4-2-3-1',
  '4-4-2',
  '3-5-2',
  '4-1-2-1-2',
  '3-4-3',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateManager(): Manager {
  const [nation, flag] = pick(NATIONS)
  return {
    id: 'mgr-' + Math.random().toString(36).slice(2, 9),
    name: pick(NAMES),
    nation,
    flag,
    formation: pick(FORMATION_IDS),
    chemistry: pick([10, 12, 15, 15, 18, 20]),
    trait: pick(TRAITS),
    rating: 84 + Math.floor(Math.random() * 12),
  }
}
