'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  id: number
  tx: number
  ty: number
  size: number
  duration: number
  delay: number
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI + Math.random() * 0.4
    const distance = 80 + Math.random() * 130
    return {
      id: i,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      size: 1.2 + Math.random() * 2,
      duration: 2.2 + Math.random() * 0.8,
      delay: Math.random() * 0.35,
    }
  })
}

interface EmojiFireworkProps {
  children: React.ReactNode
  emoji: string
}

export default function EmojiFirework({ children, emoji }: EmojiFireworkProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [fired, setFired] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          setParticles(createParticles(20))
          setFired(true)
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [fired])

  return (
    <div ref={ref} className="relative">
      {children}
      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute top-1/2 left-1/2 select-none"
          style={
            {
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
              animation: `emojiX ${p.duration}s linear ${p.delay}s forwards`,
              zIndex: 10,
            } as React.CSSProperties
          }
        >
          <span
            style={{
              display: 'block',
              fontSize: `${p.size}rem`,
              lineHeight: 1,
              animation: `emojiY ${p.duration}s linear ${p.delay}s forwards`,
            }}
          >
            {emoji}
          </span>
        </span>
      ))}
    </div>
  )
}
