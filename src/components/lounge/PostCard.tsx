import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { CommunityPost, StoredBlock } from '@/types/community';
import { CategoryBadge } from './CategoryBadge';
import { BingoGrid } from './BingoGrid';
import { Avatar } from './Avatar';

function parseBlocks(content: string): StoredBlock[] | null {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0].type === 'string') {
      return parsed as StoredBlock[];
    }
  } catch { /* noop */ }
  return null;
}

interface PostCardProps {
  post: CommunityPost;
  priority?: boolean;
}

export const PostCard = memo(function PostCard({ post, priority = false }: PostCardProps) {
  const blocks = parseBlocks(post.body);

  let firstText = '';
  let firstImageUrl: string | null = null;
  let hasBingo = false;

  if (blocks) {
    for (const b of blocks) {
      if (b.type === 'text' && !firstText) firstText = b.value;
      if (b.type === 'image' && !firstImageUrl) firstImageUrl = (post.imageUrls ?? [])[b.index] ?? null;
      if (b.type === 'bingo') hasBingo = true;
    }
  } else {
    firstText = post.body;
    if (post.bingo) hasBingo = true;
    else if (post.imageUrls?.length) firstImageUrl = post.imageUrls[0];
  }

  return (
    <Link href={`/lounge/${post.id}`} prefetch={priority} className="block px-5 pt-4 pb-4 hover:bg-gray-50 transition-colors">
      {/* 작성자 */}
      <div className="flex items-center gap-2">
        <Avatar avatarUrl={post.avatarUrl} author={post.author} seed={post.isAnonymous ? post.id : undefined} size={32} />
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-sm font-semibold text-[#181C1C] truncate">{post.author}</span>
          <span className="text-[#181C1C] text-xs">•</span>
          <span className="text-xs text-[#929898] shrink-0">{post.timeAgo}</span>
        </div>
        <div className="ml-auto shrink-0">
          <CategoryBadge category={post.category} />
        </div>
      </div>

      {/* 제목 */}
      <p className="mt-3 text-sm font-semibold text-[#181C1C] line-clamp-2">{post.title}</p>

      {/* 본문 텍스트 */}
      {firstText && (
        <p className="mt-1 text-sm text-[#4C5252] line-clamp-2">{firstText}</p>
      )}

      {/* 미디어 (빙고 우선, 없으면 이미지) */}
      {hasBingo && post.bingo ? (
        <div className="mt-3">
          <BingoGrid cells={post.bingo.cells} grid={post.bingo.grid} title={post.bingo.title} compact />
        </div>
      ) : firstImageUrl ? (
        <div className="mt-3 relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={firstImageUrl}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 512px) calc(100vw - 40px), 472px"
            className="object-cover"
          />
        </div>
      ) : null}

      {/* 좋아요 / 댓글 */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1 text-[#929898]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span className="text-sm">{post.likeCount}</span>
        </div>
        <div className="flex items-center gap-1 text-[#929898]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="text-sm">{post.commentCount}</span>
        </div>
      </div>
    </Link>
  );
});
