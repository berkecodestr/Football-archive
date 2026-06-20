'use client'

import { AppShell } from '@/components/shell/app-shell'

export default function QuizPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-black mb-6">Quiz Arena</h1>
      <div className="glass p-6 rounded-3xl">
        <p className="text-muted-foreground text-sm mb-6">Test your football knowledge and earn rewards.</p>
        <button className="w-full py-4 bg-neon text-black font-black rounded-2xl">
          Start Challenge
        </button>
      </div>
    </AppShell>
  )
}
