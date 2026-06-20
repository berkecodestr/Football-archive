'use client'

import { AppShell } from '@/components/shell/app-shell'
import { useGame } from '@/lib/game-store'
import { Star, Shield, Zap, Medal } from 'lucide-react'

export default function ProfilePage() {
  const { state } = useGame()

  return (
    <AppShell>
      <h1 className="text-2xl font-black mb-6">Profile</h1>

      {/* Profil Kartı */}
      <div className="glass p-6 rounded-3xl text-center mb-6">
        <div className="h-24 w-24 rounded-full bg-gold/20 mx-auto mb-4 flex items-center justify-center border-2 border-gold/50">
          <span className="text-3xl font-black text-gold">M</span>
        </div>
        <h2 className="text-xl font-black">Manager</h2>
        <p className="text-sm text-muted-foreground">Elite Division</p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-bold">
          <Zap className="h-3 w-3 text-neon" />
          LEVEL {state.level}
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Medal className="h-4 w-4" />
            <span className="text-[10px] uppercase font-bold">Titles</span>
          </div>
          <p className="text-xl font-black">{state.stats.championships}</p>
        </div>
        <div className="glass p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Star className="h-4 w-4" />
            <span className="text-[10px] uppercase font-bold">Best Rating</span>
          </div>
          <p className="text-xl font-black">{state.stats.bestRating}</p>
        </div>
        <div className="glass p-4 rounded-2xl col-span-2">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Shield className="h-4 w-4" />
            <span className="text-[10px] uppercase font-bold">Collection</span>
          </div>
          <p className="text-sm font-bold">{state.collection.length} Players Owned</p>
        </div>
      </div>
    </AppShell>
  )
}
