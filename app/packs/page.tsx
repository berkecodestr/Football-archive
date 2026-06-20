'use client'

import { AppShell } from '@/components/shell/app-shell'

export default function PacksPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-black mb-6">Store</h1>
      <div className="grid grid-cols-2 gap-4">
        {['Gold Pack', 'Premium', 'Legend', 'Ultimate'].map((pack) => (
          <div key={pack} className="glass p-5 rounded-3xl text-center">
            <div className="h-24 w-full bg-secondary rounded-xl mb-3" />
            <h3 className="font-bold text-sm">{pack}</h3>
            <button className="mt-3 w-full py-2 bg-gold text-black rounded-lg text-xs font-black">
              Buy
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
