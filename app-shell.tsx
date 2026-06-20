import type { ReactNode } from 'react'
import { TopBar } from './top-bar'
import { BottomNav } from './bottom-nav'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col grain">
      <TopBar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-5">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
