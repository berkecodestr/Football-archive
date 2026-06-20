'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Dice5, Crown, RefreshCw, ShieldCheck } from 'lucide-react'
import { generateManager } from '@/lib/data/managers'
import { getFormation } from '@/lib/data/formations'
import { useDraft } from '@/lib/draft-store'
import type { Manager } from '@/lib/types'

// DraftFlow'dan gelecek prop tiplerini ekledik
interface ManagerStepProps {
  isProcessing: boolean
  setIsProcessing: (val: boolean) => void
}

export function ManagerStep({ isProcessing, setIsProcessing }: ManagerStepProps) {
  const { chooseManager, formationId, setPhase } = useDraft()
  const [manager, setManager] = useState<Manager | null>(null)

  const reroll = () => {
    if (isProcessing) return // Güvenlik kilidi
    
    setIsProcessing(true) // İşlemi başlat ve butonları kilitle
    let ticks = 0
    const id = setInterval(() => {
      setManager(generateManager())
      ticks++
      if (ticks > 8) {
        clearInterval(id)
        setIsProcessing(false) // İşlem bitince kilidi kaldır
      }
    }, 70)
  }

  useEffect(() => {
    setManager(generateManager())
  }, [])

  const formationName = getFormation(formationId).name
  const matchesFormation = manager?.formation === formationId

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            Step 2 of 3
          </p>
          <h1 className="text-2xl font-black">Elite Manager</h1>
        </div>
        <button
          onClick={() => setPhase('formation')}
          disabled={isProcessing}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground disabled:opacity-50"
        >
          Back
        </button>
      </div>

      <AnimatePresence mode="wait">
        {manager && (
          <motion.div
            key={manager.id}
            initial={{ opacity: 0, scale: 0.96, rotateY: 12 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden rounded-3xl glass-gold p-5"
          >
            {/* ... mevcut kart içeriği aynı ... */}
            <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-background/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                <Crown className="h-3.5 w-3.5" /> Legendary
              </span>
              <span className="text-4xl">{manager.flag}</span>
            </div>
            {/* ... Kart içeriği (Name, Rating vs) aynı kalsın ... */}
            <div className="mt-4 flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl gold-surface text-3xl font-black shadow-lg">
                {manager.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-black leading-tight text-balance">{manager.name}</h2>
                <p className="text-sm text-muted-foreground">{manager.nation}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black gold-gradient-text">{manager.rating}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={reroll}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 rounded-2xl glass py-3.5 text-sm font-bold transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isProcessing ? 'animate-spin' : ''}`} />
          Re-roll
        </button>
        <button
          onClick={() => manager && chooseManager(manager)}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 rounded-2xl gold-surface py-3.5 text-sm font-bold shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          <Dice5 className="h-4 w-4" />
          Confirm
        </button>
      </div>
    </div>
  )
}
