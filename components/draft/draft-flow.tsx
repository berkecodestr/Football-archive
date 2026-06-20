"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { useDraft } from "@/lib/draft-store"
import { useGame } from "@/lib/game-store"
import { simulateTournament, isChampion, type SimMatch } from "@/lib/tournament-sim"
import { FormationStep } from "./formation-step"
import { ManagerStep } from "./manager-step"
import { SquadStep } from "./squad-step"
import { TournamentStep } from "./tournament-step"
import { ChampionStep } from "./champion-step"

export function DraftFlow() {
  const { phase, setPhase, placed, stats, manager, reset } = useDraft()
  const { addCoins, addXp, recordChampionship, unlockAchievement } = useGame()
  const router = useRouter()
  const [matches, setMatches] = useState<SimMatch[]>([])
  const [settled, setSettled] = useState(false)

  const teamName = useMemo(() => {
    if (manager) return `${manager.flag} ${manager.name.split(" ").pop()} XI`
    return "Your XI"
  }, [manager])

  // Build the tournament when entering the tournament phase
  if (phase === "tournament" && matches.length === 0) {
    setMatches(simulateTournament(stats.ovr, placed))
  }

  const champion = isChampion(matches)
  const rewards = useMemo(() => {
    const base = matches.filter((m) => m.won).length * 150
    return { coins: base + (champion ? 500 : 0), xp: base + (champion ? 400 : 100) }
  }, [matches, champion])

  const finishTournament = () => {
    if (!settled) {
      addCoins(rewards.coins)
      addXp(rewards.xp)
      if (champion) {
        recordChampionship()
        unlockAchievement("first-champ")
      }
      setSettled(true)
    }
    setPhase("champion")
  }

  const playAgain = () => {
    setMatches([])
    setSettled(false)
    reset()
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
      >
        {phase === "formation" && <FormationStep />}
        {phase === "manager" && <ManagerStep />}
        {phase === "squad" && <SquadStep />}
        {phase === "tournament" && (
          <TournamentStep matches={matches} teamName={teamName} onComplete={finishTournament} />
        )}
        {phase === "champion" && (
          <ChampionStep
            champion={champion}
            matches={matches}
            teamName={teamName}
            rewards={rewards}
            onReturn={() => router.push("/")}
            onPlayAgain={playAgain}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
