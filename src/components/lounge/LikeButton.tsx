'use client';

import { openAppInstallModal } from '@/lib/appModal';

interface LikeButtonProps {
  likeCount: number;
}

export function LikeButton({ likeCount }: LikeButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openAppInstallModal();
      }}
      aria-label="좋아요"
      className="flex items-center gap-1 text-[#929898] hover:text-[#FF5A79] transition-colors cursor-pointer"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="text-sm">{likeCount}</span>
    </button>
  );
}
