'use client'

import { useState } from 'react'
import { AppShell } from "@/components/shell/app-shell"
import { DraftProvider } from "@/lib/draft-store"
import { DraftFlow } from "@/components/draft/draft-flow"

export default function DraftPage() {
  // Butonun çoklu tıklanmasını engellemek için global durum
  const [isProcessing, setIsProcessing] = useState(false)

  return (
    <AppShell>
      <DraftProvider>
        <DraftFlow 
          isProcessing={isProcessing} 
          setIsProcessing={setIsProcessing} 
        />
      </DraftProvider>
    </AppShell>
  )
}
