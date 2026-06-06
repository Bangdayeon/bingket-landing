'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchPosts, PAGE_SIZE } from '@/lib/community';
import { toast } from '@/lib/toast';
import type { CommunityPost, PostCategory } from '@/types/community';
import { LoungeFilter } from '@/components/lounge/Filter';
import { PostCard } from '@/components/lounge/PostCard';
import { PostSkeletonList } from '@/components/lounge/PostSkeleton';

// 위쪽 N개 카드는 LCP 후보이므로 priority 이미지로 처리
const PRIORITY_COUNT = 3;

export function LoungeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = (searchParams.get('category') as PostCategory | null) ?? null;

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const hasMoreRef = useRef(true);
  const pageRef = useRef(0);
  const categoryRef = useRef(category);

  const load = useCallback(async (cat: PostCategory | null) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchPosts(0, cat);
      setPosts(data);
      pageRef.current = 0;
      hasMoreRef.current = data.length === PAGE_SIZE;
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      setError(true);
      toast('게시글을 불러오지 못했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    categoryRef.current = category;
    load(category);
  }, [category, load]);

  // IntersectionObserver — 400px 미리 감지해서 자연스럽게 로드
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loadingMoreRef.current || !hasMoreRef.current) return;

        loadingMoreRef.current = true;
        setLoadingMore(true);
        try {
          const next = pageRef.current + 1;
          const data = await fetchPosts(next, categoryRef.current);
          setPosts((prev) => [...prev, ...data]);
          pageRef.current = next;
          hasMoreRef.current = data.length === PAGE_SIZE;
          setHasMore(data.length === PAGE_SIZE);
        } catch {
          toast('추가 게시글을 불러오지 못했습니다.', 'error');
        } finally {
          loadingMoreRef.current = false;
          setLoadingMore(false);
        }
      },
      { rootMargin: '400px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      {/* 필터 + 검색 */}
      <div className="flex items-center gap-1 px-4 pt-1 border-b border-gray-100">
        <div className="flex-1 overflow-hidden">
          <LoungeFilter />
        </div>
        <button
          onClick={() => router.push('/lounge/search')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
          aria-label="검색"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4C5252" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>

      <div className="flex-1">
        {loading ? (
          <PostSkeletonList count={6} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B4BBBB" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-sm text-[#929898]">게시글을 불러오지 못했어요</p>
            <button
              onClick={() => load(category)}
              className="text-sm font-medium text-[#28C8DE] hover:underline cursor-pointer"
            >
              다시 시도
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#929898]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <p className="text-sm">아직 게시글이 없어요</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-gray-100">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} priority={i < PRIORITY_COUNT} />
              ))}
            </div>
            {!hasMore && (
              <p className="text-center text-xs text-[#B4BBBB] py-6">모든 게시글을 불러왔어요</p>
            )}
          </>
        )}
      </div>

      {/* 무한스크롤 sentinel — 콘텐츠 아래 바로 위치 */}
      <div ref={sentinelRef} className="h-1" />

      {loadingMore && (
        <div className="flex justify-center py-5">
          <div className="w-5 h-5 border-2 border-[#28C8DE] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
