"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Swords, Trophy, Star, Loader2 } from "lucide-react"
import type { SimMatch } from "@/lib/tournament-sim"

function MatchCard({ match, index, teamName }: { match: SimMatch; index: number; teamName: string }) {
  const opp = `${match.opponent} ${match.opponentYear}`
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.5, duration: 0.5, type: "spring", stiffness: 120 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">{match.round}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
            match.won ? "bg-neon/15 text-neon" : "bg-red-500/15 text-red-400"
          }`}
        >
          {match.won ? "Win" : "Eliminated"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-right">
          <p className="truncate text-sm font-bold text-foreground">{teamName}</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-1.5">
          <span className="text-xl font-bold tabular-nums text-foreground">{match.userScore}</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-xl font-bold tabular-nums text-foreground">{match.oppScore}</span>
        </div>
        <div className="flex-1">
          <p className="truncate text-sm font-bold text-foreground">{opp}</p>
        </div>
      </div>

      {match.penalties && (
        <p className="mt-2 text-center text-xs text-gold">
          Penalties {match.penalties.user} - {match.penalties.opp}
        </p>
      )}

      <div className="mt-3 flex items-center justify-center gap-1.5 border-t border-border/50 pt-2">
        <Star className="h-3.5 w-3.5 fill-neon text-neon" />
        <span className="text-xs text-muted-foreground">
          MVP: <span className="font-semibold text-foreground">{match.mvp}</span>
        </span>
      </div>
    </motion.div>
  )
}

export function TournamentStep({
  matches,
  teamName,
  onComplete,
}: {
  matches: SimMatch[]
  teamName: string
  onComplete: () => void
}) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const total = matches.length * 500 + 900
    const t = setTimeout(() => setRevealed(true), total)
    return () => clearTimeout(t)
  }, [matches.length])

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15">
          <Swords className="h-7 w-7 text-gold" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">Tournament Mode</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your squad battles the greatest teams in history</p>
      </div>

      <div className="flex flex-col gap-3">
        {matches.map((m, i) => (
          <MatchCard key={i} match={m} index={i} teamName={teamName} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        {revealed ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onComplete}
            className="gold-button flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold"
          >
            <Trophy className="h-4 w-4" />
            View Result
          </motion.button>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-gold" />
            Simulating matches...
          </div>
        )}
      </div>
    </div>
  )
}
