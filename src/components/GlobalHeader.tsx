'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function GlobalHeader() {
  const pathname = usePathname()
  if (pathname.startsWith('/lounge')) return null
  return (
    <header className="sticky top-0 z-30 w-full flex justify-center bg-white/60 backdrop-blur-md border-b border-white/40">
      <Header />
    </header>
  )
}
