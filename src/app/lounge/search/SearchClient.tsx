'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchPosts } from '@/lib/community';
import { toast } from '@/lib/toast';
import type { CommunityPost } from '@/types/community';
import { PostCard } from '@/components/lounge/PostCard';

const MAX_RECENT = 10;
const STORAGE_KEY = 'bingket-recent-searches';

function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecentSearches(list: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch { /* noop */ }
}

export function SearchClient() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [searches, setSearches] = useState<string[]>([]);
  const [results, setResults] = useState<CommunityPost[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearches(getRecentSearches());
    inputRef.current?.focus();
  }, []);

  const runSearch = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;

      const updated = [trimmed, ...searches.filter((s) => s !== trimmed)].slice(0, MAX_RECENT);
      setSearches(updated);
      saveRecentSearches(updated);

      setLoading(true);
      try {
        const data = await searchPosts(trimmed);
        setResults(data);
      } catch {
        toast('검색 중 오류가 발생했습니다.', 'error');
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [searches],
  );

  function handleDelete(label: string) {
    const updated = searches.filter((s) => s !== label);
    setSearches(updated);
    saveRecentSearches(updated);
  }

  function handleDeleteAll() {
    setSearches([]);
    saveRecentSearches([]);
  }

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-4 h-[60px] border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4C5252" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="flex-1 flex items-center gap-2 bg-gray-200 rounded-xl h-10 px-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#929898" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (!e.target.value) setResults(null);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') runSearch(value); }}
            placeholder="글 제목, 내용, 빙고 아이템"
            className="flex-1 bg-transparent text-sm text-[#181C1C] outline-none placeholder:text-[#929898]"
          />
          {value && (
            <button
              onClick={() => { setValue(''); setResults(null); inputRef.current?.focus(); }}
              className="text-[#929898] text-lg leading-none cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#28C8DE] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* 검색 결과 */}
      {!loading && results !== null && (
        results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#929898]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p className="text-sm">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100">
            {results.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )
      )}

      {/* 최근 검색어 */}
      {!loading && results === null && (
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-[#181C1C]">최근 검색어</span>
            {searches.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="text-sm font-medium text-[#4C5252] hover:text-[#181C1C] cursor-pointer"
              >
                전체 삭제
              </button>
            )}
          </div>
          {searches.length === 0 ? (
            <p className="text-sm text-center text-[#929898] py-4">최근 검색어가 없습니다.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {searches.map((search) => (
                <div
                  key={search}
                  className="flex items-center gap-1.5 h-9 pl-3 pr-2 rounded-full bg-gray-100 border border-gray-200"
                >
                  <button
                    onClick={() => { setValue(search); runSearch(search); }}
                    className="text-sm text-[#181C1C] cursor-pointer"
                  >
                    {search}
                  </button>
                  <button
                    onClick={() => handleDelete(search)}
                    className="text-[#929898] text-base leading-none hover:text-[#4C5252] cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
