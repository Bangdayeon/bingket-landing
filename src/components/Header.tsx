'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Button from "./commons/Button"

export default function Header() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSelect(path: string) {
    router.push(path)
    setMenuOpen(false)
  }

  return (
    <div className="relative flex items-center justify-between w-full max-w-6xl px-5 py-3">
      <button className="flex gap-2 items-center cursor-pointer" onClick={() => router.push('/')}>
        <Image src="/images/logo.png" alt="빙킷 로고" width={48} height={48}/>
        <Image src="/images/logo_text.png" alt="빙킷 로고 텍스트" width={100} height={24} className="contain-content"/>
      </button>
      <div className="flex items-center gap-4">
        <Button onClick={() => window.open('https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987', '_blank')}>iOS 앱 다운로드</Button>
        <button className="cursor-pointer" onClick={() => setMenuOpen(prev => !prev)}>
          <Image src='/images/menu.png' alt='메뉴' width={24} height={24}/>
        </button>
      </div>

      {/* backdrop */}
      <div
        className={`fixed inset-0 z-10 transition-opacity duration-200 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* popup */}
      <div
        className={`absolute right-5 top-16 mt-2 z-20 bg-white rounded-2xl shadow-lg overflow-hidden min-w-45 origin-top-right transition-all duration-200 ease-out
          ${menuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
      >
        <button
          className="w-full text-left px-5 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => handleSelect('/')}
        >
          앱 소개 보기
        </button>
        <div className="border-t border-gray-100"/>
        <button
          className="w-full text-left px-5 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => handleSelect('/bingo')}
        >
          오늘의 빙고 만들기
        </button>
      </div>
    </div>
  )
}
