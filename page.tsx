import { AppShell } from "@/components/shell/app-shell"
import { DraftProvider } from "@/lib/draft-store"
import { DraftFlow } from "@/components/draft/draft-flow"

export default function DraftPage() {
  return (
    <AppShell>
      <DraftProvider>
        <DraftFlow />
      </DraftProvider>
    </AppShell>
  )
}
