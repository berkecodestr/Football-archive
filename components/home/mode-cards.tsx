'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Layers, Package, Brain, ChevronRight } from 'lucide-react'

const MODES = [
  {
    href: '/draft',
    title: 'VIP Draft',
    tag: 'Main Mode',
    desc: 'Pick a formation, draft a legendary XI and conquer the tournament.',
    icon: Layers,
    accent: 'gold' as const,
  },
  {
    href: '/packs',
    title: 'Ultimate Pack Opening',
    tag: 'Collect',
    desc: 'Rip premium packs. Chase Icons, Heroes and secret prime cards.',
    icon: Package,
    accent: 'neon' as const,
  },
  {
    href: '/quiz',
    title: 'Football Quiz Arena',
    tag: 'Skill',
    desc: 'Timed multiple-choice trivia across 9 categories. Climb the ranks.',
    icon: Brain,
    accent: 'gold' as const,
  },
]

export function ModeCards() {
  return (
    <div className="grid gap-3">
      {MODES.map((m, i) => {
        const Icon = m.icon
        const isGold = m.accent === 'gold'
        return (
          <motion.div
            key={m.href}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Link
              href={m.href}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl glass p-4 transition-transform active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl"
                style={{ background: isGold ? '#d4af37' : '#32ff9c' }}
              />
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                  isGold ? 'glass-gold text-gold' : 'border border-accent/30 bg-accent/10 text-neon'
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <span
                  className={`mb-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                    isGold ? 'bg-primary/15 text-gold' : 'bg-accent/15 text-neon'
                  }`}
                >
                  {m.tag}
                </span>
                <h3 className="truncate text-base font-bold">{m.title}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {m.desc}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
