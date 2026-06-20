import type { Player } from "./types"
import { TOURNAMENT_TEAMS } from "./data/tournament"

export type SimMatch = {
  round: "Quarter Final" | "Semi Final" | "Final"
  opponent: string
  opponentYear: string
  userScore: number
  oppScore: number
  penalties?: { user: number; opp: number }
  mvp: string
  won: boolean
}

function pickMvp(players: Player[]): string {
  const valid = players.filter(Boolean)
  if (valid.length === 0) return "Unknown"
  const sorted = [...valid].sort((a, b) => b.rating - a.rating)
  const pool = sorted.slice(0, Math.min(5, sorted.length))
  return pool[Math.floor(Math.random() * pool.length)].name
}

function simulateMatch(
  round: SimMatch["round"],
  teamRating: number,
  oppRating: number,
  players: Player[],
): SimMatch {
  const opp = TOURNAMENT_TEAMS[Math.floor(Math.random() * TOURNAMENT_TEAMS.length)]
  const diff = teamRating - oppRating
  const userBase = Math.max(0, 1.4 + diff * 0.12 + (Math.random() * 1.6 - 0.6))
  const oppBase = Math.max(0, 1.4 - diff * 0.12 + (Math.random() * 1.6 - 0.6))
  const userScore = Math.round(userBase)
  const oppScore = Math.round(oppBase)

  let penalties: SimMatch["penalties"]
  if (userScore === oppScore) {
    const userPens = 3 + Math.floor(Math.random() * 3)
    let oppPens = 3 + Math.floor(Math.random() * 3)
    if (oppPens === userPens) oppPens = diff >= 0 ? userPens - 1 : userPens + 1
    penalties = { user: userPens, opp: oppPens }
  }

  const won = penalties ? penalties.user > penalties.opp : userScore > oppScore

  return {
    round,
    opponent: opp.name,
    opponentYear: opp.year,
    userScore,
    oppScore,
    penalties,
    mvp: pickMvp(players),
    won,
  }
}

export function simulateTournament(teamRating: number, players: Player[]): SimMatch[] {
  const rounds: SimMatch["round"][] = ["Quarter Final", "Semi Final", "Final"]
  const matches: SimMatch[] = []
  for (let i = 0; i < rounds.length; i++) {
    const oppRating = teamRating - 4 + i * 2 + (Math.random() * 4 - 2)
    const match = simulateMatch(rounds[i], teamRating, oppRating, players)
    matches.push(match)
    if (!match.won) break
  }
  return matches
}

export function isChampion(matches: SimMatch[]): boolean {
  const final = matches.find((m) => m.round === "Final")
  return !!final && final.won
}
