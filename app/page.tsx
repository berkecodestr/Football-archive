'use client'

import { motion } from 'motion/react'
import { AppShell } from '@/components/shell/app-shell'
import { ModeCards } from '@/components/home/mode-cards'
import {
  DailyReward,
  DailyDraftChallenge,
  FeaturedEvents,
  SeasonBanner,
} from '@/components/home/dashboard-widgets'
import { useGame } from '@/lib/game-store'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </h2>
  )
}

export default function HomePage() {
  const { state } = useGame()

  return (
    <AppShell>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl glass-gold p-5"
      >
        <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          Welcome back, Manager
        </p>
        <h1 className="mt-1 text-2xl font-black leading-tight text-balance">
          The <span className="gold-gradient-text">Elite Lounge</span> awaits
        </h1>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Draft icons, open premium packs and rise through the global ranks in
          the most luxurious football experience.
        </p>
        <div className="mt-4 flex gap-2">
          <div className="flex-1 rounded-xl bg-background/40 p-3 text-center">
            <p className="text-lg font-black text-gold">{state.level}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Level
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-background/40 p-3 text-center">
            <p className="text-lg font-black text-neon">
              {state.coins.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Coins
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-background/40 p-3 text-center">
            <p className="text-lg font-black">{state.stats.championships}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Titles
            </p>
          </div>
        </div>
      </motion.section>

      <SectionTitle>Daily Reward</SectionTitle>
      <DailyReward />

      <SectionTitle>Game Modes</SectionTitle>
      <ModeCards />

      <SectionTitle>Today&apos;s Challenge</SectionTitle>
      <DailyDraftChallenge />

      <SectionTitle>Featured Events</SectionTitle>
      <FeaturedEvents />

      <SectionTitle>Season</SectionTitle>
      <SeasonBanner />

      <div className="h-2" />
    </AppShell>
  )
}
