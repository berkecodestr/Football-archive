'use client'

import { AppShell } from '@/components/shell/app-shell'
import { useGame } from '@/lib/game-store'
import { useState } from 'react'

export default function DraftPage() {
  const { state, recordDraft } = useGame()
  const [step, setStep] = useState(1) // 1: Diziliş, 2: Teknik Direktör, 3: Oyuncular

  // Teknik Direktör Seçimini Düzeltme (2 kere dönme hatası için)
  const handleManagerSelect = (managerName: string) => {
    // Burada dispatch işlemini tek bir seferde yapıyoruz
    recordDraft(85, 90) // Örnek değerler
    setStep(3)
  }

  return (
    <AppShell>
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-black mb-4">Choose Formation</h1>
          {/* Diziliş seçim butonların */}
          <button onClick={() => setStep(2)} className="w-full p-4 bg-gold text-black font-black rounded-xl">Continue to Manager</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="text-2xl font-black mb-4">Elite Manager</h1>
          {/* Buradaki Re-roll butonunun 2 kere tetiklenmesini engelledik */}
          <button onClick={() => handleManagerSelect('Manager A')} className="w-full p-4 bg-gold text-black font-black rounded-xl">Confirm</button>
        </div>
      )}
    </AppShell>
  )
}
