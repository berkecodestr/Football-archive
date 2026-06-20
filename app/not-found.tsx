// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-black mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Aradığın sayfayı bulamadık.</p>
      <Link href="/" className="px-6 py-3 bg-gold text-black font-bold rounded-xl">
        Ana Sayfaya Dön
      </Link>
    </div>
  )
}
