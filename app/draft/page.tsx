'use client'

import { AppShell } from '@/components/shell/app-shell'
import { SQUAD_POOLS } from '@/lib/data' // Senin verilerin
import { useState } from 'react'

export default function DraftPage() {
  const [team, setTeam] = useState<any[]>([])
  const pool = SQUAD_POOLS['Real Madrid 2017'] // Havuz

  const pickPlayer = (player: any) => {
    if (team.length < 11) setTeam([...team, player])
  }

  return (
    <AppShell>
      <h1 className="text-xl font-black mb-4">Draft: {team.length}/11</h1>
      
      <div className="grid gap-2">
        {pool.map((p) => (
          <button 
            key={p.id} 
            onClick={() => pickPlayer(p)}
            className="flex justify-between p-4 glass rounded-xl hover:bg-gold/10"
          >
            <span>{p.name}</span>
            <span className="text-gold font-bold">{p.rating}</span>
          </button>
        ))}
      </div>
    </AppShell>
  )
}
