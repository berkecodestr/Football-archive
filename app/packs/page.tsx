'use client'

import { AppShell } from '@/components/shell/app-shell'
import { Coins } from 'lucide-react'

const PACKS = [
  { id: 'gold', name: 'Gold Pack', price: 500, color: 'text-gold' },
  { id: 'prem', name: 'Premium Pack', price: 1200, color: 'text-neon' },
  { id: 'legend', name: 'Legend Pack', price: 3000, color: 'text-white' },
]

export default function PacksPage() {
  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">Pack Store</h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {PACKS.map((pack) => (
          <div key={pack.id} className="glass p-5 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center font-black text-xl">
                📦
              </div>
              <div>
                <h3 className={`font-bold ${pack.color}`}>{pack.name}</h3>
                <p className="text-xs text-muted-foreground">Guarantee 1+ Rare</p>
              </div>
            </div>
            
            <button className="flex items-center gap-1.5 px-4 py-2 bg-gold/10 hover:bg-gold/20 text-gold rounded-xl font-bold transition-all">
              <Coins className="h-4 w-4" />
              {pack.price}
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
