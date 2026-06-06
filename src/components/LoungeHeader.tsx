'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoungeHeader() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <button
        onClick={() => router.back()}
        className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="뒤로 가기"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#181C1C" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-1.5"
        aria-label="메인으로"
      >
        <Image src="/images/logo.png" alt="빙킷" width={32} height={32} />
        <Image src="/images/logo_text.png" alt="빙킷" width={70} height={17} className="contain-content" />
      </button>
    </div>
  )
}
