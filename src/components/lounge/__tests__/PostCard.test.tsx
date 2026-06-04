import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCard } from '../PostCard';
import type { CommunityPost } from '@/types/community';

const BASE_POST: CommunityPost = {
  id: 'post-1',
  title: '빙고 포스트',
  userId: 'user-1',
  author: '테스트유저',
  isAnonymous: false,
  avatarUrl: null,
  timeAgo: '방금 전',
  createdAt: new Date().toISOString(),
  body: JSON.stringify([{ type: 'bingo' }]),
  likeCount: 0,
  commentCount: 0,
  category: 'bingo_board',
  imageUrls: [],
};

describe('PostCard', () => {
  it('post.bingo가 정의되면 BingoGrid를 렌더링한다', () => {
    const post: CommunityPost = {
      ...BASE_POST,
      bingo: {
        title: '내 빙고',
        cells: ['운동', '독서', '명상', '산책', '요리', '청소', '글쓰기', '그림', '음악'],
        grid: '3x3',
        theme: 'default',
      },
    };

    render(<PostCard post={post} />);
    // BingoGrid는 title을 렌더링함
    expect(screen.getByText('내 빙고')).toBeInTheDocument();
    expect(screen.getByText('운동')).toBeInTheDocument();
  });

  it('post.bingo가 undefined이면 BingoGrid를 렌더링하지 않는다 (RLS 버그 상황)', () => {
    const post: CommunityPost = {
      ...BASE_POST,
      bingo: undefined,
    };

    render(<PostCard post={post} />);
    // 빙고 셀 내용이 보이지 않아야 함
    expect(screen.queryByText('운동')).not.toBeInTheDocument();
  });
});
