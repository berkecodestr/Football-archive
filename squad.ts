import type {
  Formation,
  Manager,
  PlacedPlayer,
  Position,
} from '@/lib/types'

const ATTACK_POS: Position[] = ['ST', 'CF', 'LW', 'RW', 'CAM', 'RM', 'LM']
const DEFENSE_POS: Position[] = ['GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM']

export interface ChemistryBreakdown {
  positionFit: number
  linkLines: number
  coachSystem: number
  coachNation: number
  total: number
}

export interface SquadStats {
  ovr: number
  attack: number
  defense: number
  count: number
  chemistry: ChemistryBreakdown
}

function fitsPosition(player: PlacedPlayer, slotPos: Position): boolean {
  if (player.position === slotPos) return true
  return player.altPositions?.includes(slotPos) ?? false
}

export function computeSquadStats(
  placed: PlacedPlayer[],
  formation: Formation,
  manager: Manager | null,
): SquadStats {
  const count = placed.length
  const slotMap = new Map(formation.slots.map((s) => [s.id, s.position]))

  // OVR
  const avg =
    count === 0 ? 0 : placed.reduce((a, p) => a + p.rating, 0) / count

  // Attack / Defense based on relevant positions, fallback to overall avg
  const atkPlayers = placed.filter((p) => ATTACK_POS.includes(p.position))
  const defPlayers = placed.filter((p) => DEFENSE_POS.includes(p.position))
  const attack = atkPlayers.length
    ? atkPlayers.reduce((a, p) => a + p.rating, 0) / atkPlayers.length
    : avg
  const defense = defPlayers.length
    ? defPlayers.reduce((a, p) => a + p.rating, 0) / defPlayers.length
    : avg

  // --- Chemistry ---
  // Position fit (max 35)
  let fit = 0
  placed.forEach((p) => {
    const slotPos = slotMap.get(p.slotId)
    if (slotPos && p.position === slotPos) fit += 1
    else if (slotPos && fitsPosition(p, slotPos)) fit += 0.5
  })
  const positionFit = count ? Math.round((fit / 11) * 35) : 0

  // Link lines: shared nation or team across the squad (max 30)
  let links = 0
  const nationCount = new Map<string, number>()
  const teamCount = new Map<string, number>()
  placed.forEach((p) => {
    nationCount.set(p.nation, (nationCount.get(p.nation) ?? 0) + 1)
    teamCount.set(p.team, (teamCount.get(p.team) ?? 0) + 1)
  })
  nationCount.forEach((n) => {
    if (n >= 2) links += (n - 1) * 2
  })
  teamCount.forEach((n) => {
    if (n >= 2) links += (n - 1) * 2.5
  })
  const linkLines = Math.min(30, Math.round(links))

  // Coach system: manager formation matches selected formation (max 20)
  const coachSystem = manager
    ? manager.formation === formation.id
      ? 20
      : 8
    : 0

  // Coach nation: players sharing the manager's nation (max 15)
  let coachNation = 0
  if (manager) {
    const same = placed.filter((p) => p.nation === manager.nation).length
    coachNation = Math.min(15, same * 3)
  }

  const total = Math.min(
    100,
    positionFit + linkLines + coachSystem + coachNation,
  )

  return {
    ovr: count ? Math.round(avg * 10) / 10 : 0,
    attack: Math.round(attack),
    defense: Math.round(defense),
    count,
    chemistry: { positionFit, linkLines, coachSystem, coachNation, total },
  }
}
