'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Layers, Package, Brain, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/draft', label: 'Draft', icon: Layers },
  { href: '/packs', label: 'Packs', icon: Package },
  { href: '/quiz', label: 'Quiz', icon: Brain },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2">
        {ITEMS.map((item) => {
          const active =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors',
                active ? 'text-gold' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl transition-all',
                  active && 'glass-gold glow-gold',
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
