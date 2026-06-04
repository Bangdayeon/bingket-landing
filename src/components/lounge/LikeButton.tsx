'use client'

import { useState } from 'react'

interface LikeButtonProps {
  likeCount: number
}

export function LikeButton({ likeCount }: LikeButtonProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="flex items-center gap-1 text-[#929898] cursor-pointer hover:text-[#FF6B6B] transition-colors"
        aria-label={`좋아요 ${likeCount}개`}
        onClick={() => setShowModal(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span className="text-sm">{likeCount}</span>
      </button>

      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl p-6 pb-10 shadow-xl">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <p className="text-base font-bold text-[#181C1C] mb-1">좋아요는 앱에서 눌러봐요</p>
            <p className="text-sm text-[#4C5252] mb-5">앱에서 직접 응원하고 소통해보세요</p>
            <div className="flex gap-2">
              <a
                href="https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 rounded-xl bg-white border border-gray-300 text-gray-800 text-sm font-medium flex items-center justify-center gap-2 hover:border-gray-400 transition-colors"
              >
                <img src="/images/apple_logo.png" alt="" width={16} height={16} className="pb-0.5" />
                앱스토어
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.day.bingket.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 rounded-xl bg-white border border-gray-300 text-gray-800 text-sm font-medium flex items-center justify-center gap-2 hover:border-gray-400 transition-colors"
              >
                <img src="/images/google_logo.svg" alt="" width={16} height={16} />
                플레이스토어
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
