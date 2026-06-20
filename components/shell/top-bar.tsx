'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation' // Yönlendirme için eklendi
import { Coins, Settings, Zap } from 'lucide-react'
import { useGame } from '@/lib/game-store'

export function TopBar() {
  const { state, xpProgress } = useGame()
  const router = useRouter() // Router hook'u başlatıldı

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gold-surface text-sm font-black shadow-md">
            VIP
          </span>
          <span className="hidden text-sm font-bold leading-tight sm:block">
            <span className="gold-gradient-text">VIP Football</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Draft Lounge
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-neon" />
            <span className="text-xs font-bold text-neon">LV {state.level}</span>
            <span className="ml-1 hidden h-1.5 w-12 overflow-hidden rounded-full bg-muted sm:block">
              <span
                className="block h-full rounded-full bg-neon transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">
            <Coins className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-bold text-gold tabular-nums">
              {state.coins.toLocaleString()}
            </span>
          </div>

          {/* Ayarlar butonu güncellendi */}
          <button
            onClick={() => router.push('/settings')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
