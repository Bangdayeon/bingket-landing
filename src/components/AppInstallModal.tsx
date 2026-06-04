'use client';

import { useState, useEffect } from 'react';
import { subscribeAppModal, closeAppInstallModal } from '@/lib/appModal';

const APP_STORE_URL = 'https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.day.bingket.app';

export function AppInstallModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => subscribeAppModal(setOpen), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAppInstallModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="빙킷 앱 설치 안내"
      onClick={closeAppInstallModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6
        animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl
          animate-in zoom-in-95 fade-in duration-200"
      >
        <button
          type="button"
          onClick={closeAppInstallModal}
          aria-label="닫기"
          className="absolute top-3 right-3 p-1 rounded-full text-[#929898] hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <p className="text-base font-bold text-[#181C1C] mb-1">빙킷 앱에서 만나요</p>
        <p className="text-sm text-[#4C5252] mb-5">
          좋아요와 댓글은 앱에서 참여할 수 있어요.<br />무료로 설치하고 함께 목표를 이뤄봐요.
        </p>

        <div className="flex flex-col gap-2">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm font-medium flex items-center justify-center gap-2 hover:border-gray-400 transition-colors"
          >
            <img src="/images/apple_logo.png" alt="" width={16} height={16} className="pb-0.5" />
            앱스토어에서 받기
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm font-medium flex items-center justify-center gap-2 hover:border-gray-400 transition-colors"
          >
            <img src="/images/google_logo.svg" alt="" width={16} height={16} />
            플레이스토어에서 받기
          </a>
        </div>
      </div>
    </div>
  );
}
