'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between w-full max-w-6xl px-5 py-3">
      <button className="flex gap-2 items-center cursor-pointer" onClick={() => router.push('/')}>
        <Image src="/images/logo.png" alt="빙킷 로고" width={48} height={48}/>
        <Image src="/images/logo_text.png" alt="빙킷 로고 텍스트" width={100} height={24} className="contain-content"/>
      </button>
      <div className="flex items-center gap-3">
        <button
          className="text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:border-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          onClick={() => router.push('/bingo')}
        >
          빙고 만들기
        </button>
        <button
          className="text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:border-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          onClick={() => router.push('/lounge')}
        >
          커뮤니티
        </button>
      </div>
    </div>
  )
}
