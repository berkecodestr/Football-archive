'use client'

import { AppShell } from '@/components/shell/app-shell'
import { useGame } from '@/lib/game-store'

export default function ProfilePage() {
  const { state } = useGame()
  return (
    <AppShell>
      <h1 className="text-2xl font-black mb-6">Profile</h1>
      <div className="glass p-6 rounded-3xl text-center mb-6">
        <div className="h-20 w-20 rounded-full bg-gold mx-auto mb-4" />
        <h2 className="text-xl font-black">Manager</h2>
        <p className="text-muted-foreground text-sm">Level {state.level}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-2xl">
          <p className="text-xs text-muted-foreground">Drafts Won</p>
          <p className="text-lg font-black">{state.stats.championships}</p>
        </div>
        <div className="glass p-4 rounded-2xl">
          <p className="text-xs text-muted-foreground">Coins</p>
          <p className="text-lg font-black">{state.coins}</p>
        </div>
      </div>
    </AppShell>
  )
}
