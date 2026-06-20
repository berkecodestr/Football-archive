'use client'

import { AppShell } from '@/components/shell/app-shell'
import { Trophy, BrainCircuit, Target } from 'lucide-react'
import { useGame } from '@/lib/game-store'

export default function QuizPage() {
  const { state } = useGame()

  return (
    <AppShell>
      <h1 className="text-2xl font-black mb-6">Quiz Arena</h1>

      {/* İstatistikler Paneli */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Trophy className="h-4 w-4" />
            <span className="text-xs uppercase">Wins</span>
          </div>
          <p className="text-2xl font-black">{state.stats.quizWins}</p>
        </div>
        <div className="glass p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Target className="h-4 w-4" />
            <span className="text-xs uppercase">Accuracy</span>
          </div>
          <p className="text-2xl font-black">{state.stats.quizAccuracy}%</p>
        </div>
      </div>

      {/* Quiz Daveti */}
      <div className="glass-gold p-6 rounded-3xl text-center">
        <BrainCircuit className="h-12 w-12 mx-auto text-gold mb-4" />
        <h2 className="text-xl font-black mb-2">Daily Challenge</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Test your knowledge on today's football facts and win 200 coins.
        </p>
        <button className="w-full py-4 bg-gold text-black font-black rounded-2xl hover:opacity-90 transition-opacity">
          Start Now
        </button>
      </div>
    </AppShell>
  )
}
