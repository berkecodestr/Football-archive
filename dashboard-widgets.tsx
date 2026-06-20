'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Gift, Flame, CalendarClock, Trophy, Sparkles, Check } from 'lucide-react'
import { useGame } from '@/lib/game-store'

const DAILY_CHALLENGES = [
  '2002 World Cup Legends',
  'Champions League Winners',
  'Brazil All-Time XI',
  'Premier League Icons',
  'Golden Ball Winners',
]

function useCountdown() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now)
      end.setHours(24, 0, 0, 0)
      const diff = end.getTime() - now.getTime()
      const h = Math.floor(diff / 3.6e6)
      const m = Math.floor((diff % 3.6e6) / 6e4)
      const s = Math.floor((diff % 6e4) / 1000)
      setTime(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(
          s,
        ).padStart(2, '0')}`,
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function DailyReward() {
  const { state, claimDaily } = useGame()
  return (
    <button
      onClick={claimDaily}
      disabled={state.dailyClaimed}
      className="relative flex w-full items-center gap-3 overflow-hidden rounded-2xl glass-gold p-4 text-left transition-transform active:scale-[0.98] disabled:opacity-70"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl gold-surface">
        {state.dailyClaimed ? (
          <Check className="h-6 w-6" />
        ) : (
          <Gift className="h-6 w-6" />
        )}
      </span>
      <div className="flex-1">
        <h3 className="text-sm font-bold">
          {state.dailyClaimed ? 'Daily Reward Claimed' : 'Daily Reward Ready'}
        </h3>
        <p className="text-xs text-muted-foreground">
          {state.dailyClaimed ? 'Come back tomorrow for more' : '+150 coins · +100 XP'}
        </p>
      </div>
      {!state.dailyClaimed && (
        <span className="rounded-full gold-surface px-3 py-1.5 text-xs font-bold">
          Claim
        </span>
      )}
    </button>
  )
}

export function DailyDraftChallenge() {
  const time = useCountdown()
  const challenge =
    DAILY_CHALLENGES[new Date().getDate() % DAILY_CHALLENGES.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl glass p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neon">
          <Flame className="h-3.5 w-3.5" /> Daily Draft Challenge
        </span>
        <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 font-mono text-[11px] text-muted-foreground">
          <CalendarClock className="h-3 w-3" /> {time}
        </span>
      </div>
      <h3 className="text-lg font-bold text-balance">{challenge}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Build the themed squad to earn exclusive badges & pack tokens.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {['+800 Coins', '+500 XP', 'Pack Token', 'Exclusive Badge'].map((r) => (
          <span
            key={r}
            className="rounded-full border border-accent/25 bg-accent/5 px-2.5 py-1 text-[10px] font-semibold text-neon"
          >
            {r}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

const EVENTS = [
  { name: 'Icon Cup', day: 'Weekend', icon: Trophy, color: '#d4af37' },
  { name: 'Legends Cup', day: 'Weekend', icon: Sparkles, color: '#32ff9c' },
  { name: 'World Cup Season', day: 'Live', icon: Flame, color: '#32d0ff' },
]

export function FeaturedEvents() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {EVENTS.map((e) => {
        const Icon = e.icon
        return (
          <div
            key={e.name}
            className="flex flex-col items-center gap-2 rounded-2xl glass p-3 text-center"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `${e.color}1a`, color: e.color }}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold leading-tight">{e.name}</p>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {e.day}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function SeasonBanner() {
  const { state, xpProgress } = useGame()
  return (
    <div className="relative overflow-hidden rounded-2xl glass p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
            Season 3 · Legends of Europe
          </p>
          <h3 className="mt-0.5 text-sm font-bold">Season Pass · Tier {state.level}</h3>
        </div>
        <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold text-gold">
          {Math.round(xpProgress)}%
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#f0d77b]"
          style={{ width: `${xpProgress}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        {1000 - (state.xp % 1000)} XP to the next premium reward tier
      </p>
    </div>
  )
}
