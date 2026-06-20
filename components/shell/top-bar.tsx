'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Coins, Settings, Zap } from 'lucide-react'
import { useGame } from '@/lib/game-store'
import { useEffect, useState } from 'react'

export function TopBar() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const game = useGame()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <header className="h-16 border-b border-border bg-background" />

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo Bölümü */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 text-sm font-black border border-gold/20">
            VIP
          </span>
        </Link>

        {/* Sağ Taraftaki Stats */}
        <div className="flex items-center gap-2">
          {/* Level */}
          <div className="flex items-center gap-1.5 rounded-full border border-neon/20 bg-neon/5 px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-neon" />
            <span className="text-xs font-bold text-neon">LV {game.state.level}</span>
          </div>
          
          {/* Coin */}
          <div className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5">
            <Coins className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-bold text-gold">
              {game.state.coins.toLocaleString()}
            </span>
          </div>

          {/* Ayarlar Butonu */}
          <button
            onClick={() => router.push('/settings')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
