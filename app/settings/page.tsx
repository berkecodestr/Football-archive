'use client'

import { AppShell } from '@/components/shell/app-shell'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  return (
    <AppShell>
      <button onClick={() => router.back()} className="text-sm text-muted-foreground mb-4 hover:text-white">
        ← Geri
      </button>
      <h1 className="text-2xl font-black mb-6">Ayarlar</h1>
      
      <div className="space-y-4">
        <section className="glass p-5 rounded-3xl">
          <h2 className="font-bold mb-3">Dil Seçimi / Language</h2>
          <div className="flex gap-2">
            <button className="flex-1 py-3 bg-gold text-black font-black rounded-xl">TR</button>
            <button className="flex-1 py-3 bg-secondary font-bold rounded-xl">EN</button>
          </div>
        </section>

        <section className="glass p-5 rounded-3xl">
          <h2 className="font-bold mb-3">Hesap Bağlantısı</h2>
          <button className="w-full py-4 bg-secondary font-bold rounded-2xl border border-border">
            Google ile Bağlan
          </button>
        </section>
      </div>
    </AppShell>
  )
}
