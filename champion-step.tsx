"use client"

import { motion } from "motion/react"
import { Trophy, Home, RotateCcw, Coins, Zap, Star } from "lucide-react"
import { Confetti } from "@/components/effects/confetti"
import type { SimMatch } from "@/lib/tournament-sim"

export function ChampionStep({
  champion,
  matches,
  teamName,
  rewards,
  onReturn,
  onPlayAgain,
}: {
  champion: boolean
  matches: SimMatch[]
  teamName: string
  rewards: { coins: number; xp: number }
  onReturn: () => void
  onPlayAgain: () => void
}) {
  const wins = matches.filter((m) => m.won).length
  const goalsFor = matches.reduce((s, m) => s + m.userScore, 0)
  const goalsAgainst = matches.reduce((s, m) => s + m.oppScore, 0)
  const bestMvp = matches.length ? matches[matches.length - 1].mvp : "—"

  return (
    <div className="relative mx-auto max-w-md text-center">
      {champion && <Confetti />}

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 12 }}
        className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full"
        style={{
          background: champion
            ? "radial-gradient(circle, rgba(212,175,55,0.35), transparent 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
        }}
      >
        <motion.div
          animate={champion ? { y: [0, -8, 0] } : {}}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.4, ease: "easeInOut" }}
        >
          <Trophy className={`h-20 w-20 ${champion ? "text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" : "text-muted-foreground"}`} />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          {champion ? "Champions" : "Tournament Over"}
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-foreground text-balance">
          {champion ? `${teamName} Win The Cup` : "Better Luck Next Time"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          {champion
            ? "An elite squad delivered glory on the biggest stage."
            : `You reached the ${matches[matches.length - 1]?.round ?? "Quarter Final"} before elimination.`}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-6 grid grid-cols-3 gap-3"
      >
        {[
          { label: "Wins", value: wins },
          { label: "Goals For", value: goalsFor },
          { label: "Goals Against", value: goalsAgainst },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-3">
            <p className="text-2xl font-bold tabular-nums text-neon">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-3 glass-card flex items-center justify-center gap-2 rounded-2xl p-3"
      >
        <Star className="h-4 w-4 fill-gold text-gold" />
        <span className="text-sm text-muted-foreground">
          Tournament MVP: <span className="font-semibold text-foreground">{bestMvp}</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-3 flex items-center justify-center gap-3"
      >
        <span className="flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5 text-sm font-semibold text-gold">
          <Coins className="h-4 w-4" /> +{rewards.coins}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-neon/10 px-3 py-1.5 text-sm font-semibold text-neon">
          <Zap className="h-4 w-4" /> +{rewards.xp} XP
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mt-7 flex flex-col gap-3"
      >
        <button onClick={onPlayAgain} className="gold-button flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold">
          <RotateCcw className="h-4 w-4" />
          New Draft
        </button>
        <button
          onClick={onReturn}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card/60 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
        >
          <Home className="h-4 w-4" />
          Return to Lounge
        </button>
      </motion.div>
    </div>
  )
}
