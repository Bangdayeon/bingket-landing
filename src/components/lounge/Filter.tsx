'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { PostCategory } from '@/types/community';

const FILTERS: { label: string; value: PostCategory | null }[] = [
  { label: '전체', value: null },
  { label: '빙고판', value: 'bingo_board' },
  { label: '빙고 달성', value: 'bingo_achieve' },
  { label: '자유게시판', value: 'free' },
];

export function LoungeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get('category') as PostCategory | null) ?? null;

  function handleSelect(value: PostCategory | null) {
    const params = new URLSearchParams();
    if (value) params.set('category', value);
    router.push(`/lounge${value ? `?category=${value}` : ''}`);
  }

  return (
    <div className="flex gap-1.5 py-2 overflow-x-auto no-scrollbar">
      {FILTERS.map(({ label, value }) => {
        const selected = current === value;
        return (
          <button
            key={label}
            onClick={() => handleSelect(value)}
            className={`h-8 px-3.5 rounded-full text-[13px] font-medium shrink-0 transition-colors cursor-pointer
              ${selected
                ? 'bg-[#54DBED] border border-[#28C8DE] text-[#023540]'
                : 'bg-gray-200 text-[#4C5252] hover:bg-gray-300'
              }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
